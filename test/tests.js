
var expect = chai.expect;

describe('page', function(){
  describe('when the route matches', function(){
    it('should invoke the callback', function(done){
      page('/user/:name', function(ctx){
        done();
      })
      
      page.process( '/user/tj' );
    })

    it('should populate ctx.params', function(done){
      page('/blog/post/:name', function(params){
        expect(params.name).to.equal('something');
        done();
      })
      
      page.process('/blog/post/something');
    })
  })

  describe('when next() is called', function(){
    it('should invoke the next matching route', function(done){

      page('/forum/*', function(params, next){
        params.test = params[0];
        next();
      });

      page('/user', function(){
        
      });

      page('/forum/:fid/thread/:tid', function(params){
        expect(params.test).to.equal('1/thread/2');
        expect(params.tid).to.equal('2');
        done();
      });

      page.process('/forum/1/thread/2');
    })
  })
});