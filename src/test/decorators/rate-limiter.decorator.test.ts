const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../app');

import { expect } from 'chai';
import 'mocha';

describe('Rate Limiter', () => {
    it('processes request when limit not exceeded', () => {
        chai.request(app)
            .get('/say')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
                expect(res).to.have.property('body').to.have.property('message').to.eq('ok');
            });
    });

    it('returns 429 error for too many request per second', () => {
        chai.request(app)
            .post('/say')
            .send({ user: '123' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });

        chai.request(app)
            .post('/say')
            .send({ user: '123' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(429);
                expect(res).to.have.property('body').to.have.property('message').to.eq('limit exceeded');
            });
    });

    it('process requests for different users', () => {
        chai.request(app)
            .post('/say')
            .send({ user: '124' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });

        chai.request(app)
            .post('/say')
            .send({ user: '125' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });
    });


    it('process requests limit more than 1', () => {
        chai.request(app)
            .get('/say/limit2')
            .send({ user: '126' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });

        chai.request(app)
            .get('/say/limit2')
            .send({ user: '126' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });
    });

});
