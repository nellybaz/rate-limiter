const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../app');
import { expect } from 'chai';
import 'mocha';

describe('Rate Limiter', () => {
    it('processes request when limit not exceeded', (done) => {
        chai.request(app)
            .get('/say')
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
                expect(res).to.have.property('body').to.have.property('message').to.eq('ok');
                done();
            });
    });

    it('returns 429 error for too many request per second', (done) => {
        chai.request(app)
            .post('/say')
            .send({ user: '999' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });

        setTimeout(() => {
            chai.request(app)
                .post('/say')
                .send({ user: '999' })
                .end(function (err: any, res: any) {
                    expect(err).to.be.null;
                    expect(res).to.have.property('statusCode').to.eq(429);
                    expect(res).to.have.property('body').to.have.property('message').to.eq('limit exceeded');
                    done();
                });
        }, 3000);
    });

    it('process requests for different users', (done) => {
        chai.request(app)
            .post('/say')
            .send({ user: '124' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });

        setTimeout(() => {
            chai.request(app)
                .post('/say')
                .send({ user: '125' })
                .end(function (err: any, res: any) {
                    expect(err).to.be.null;
                    expect(res).to.have.property('statusCode').to.eq(200);
                    done();
                });
        }, 3000);
    });

    it('process requests limit more than 1', (done) => {
        chai.request(app)
            .get('/say/limit2')
            .send({ user: '126' })
            .end(function (err: any, res: any) {
                expect(err).to.be.null;
                expect(res).to.have.property('statusCode').to.eq(200);
            });

        setTimeout(() => {
            chai.request(app)
                .get('/say/limit2')
                .send({ user: '126' })
                .end(function (err: any, res: any) {
                    expect(err).to.be.null;
                    expect(res).to.have.property('statusCode').to.eq(200);
                    done();
                });
        }, 3000);
    });

     it('returns 429 when limit reached for the month', (done) => {
         const user = new Date().toUTCString();
         chai.request(app)
             .post('/say/month')
             .send({ user })
             .end(function (err: any, res: any) {
                 expect(err).to.be.null;
                 expect(res).to.have.property('statusCode').to.eq(200);
                //  done();
             });

         setTimeout(() => {
             chai.request(app)
                 .post('/say/month')
                 .send({ user })
                 .end(function (err: any, res: any) {
                     expect(err).to.be.null;
                     expect(res).to.have.property('statusCode').to.eq(429);
                     expect(res).to.have.property('body').to.have.property('message').to.eq('limit exceeded');
                     done();
                 });
         }, 3000);
     });
});
