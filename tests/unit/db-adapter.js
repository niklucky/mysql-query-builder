'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var DbAdapter = require('../../src/db-adapter.js');
var dba = null;
var mocks = require('./../mocks');

beforeEach(function(done) {

  done();
});

describe('DBAdapter', function() {
  it('constructor() empty', function() {
    dba = new DbAdapter();
    assert(dba instanceof DbAdapter);
  });

  it('constructor( mysql ) - mysql module installation check', function() {
    try {
      dba = new DbAdapter('mysql');
      assert(dba instanceof DbAdapter);
      assert.equal(dba.getDbType(), 'mysql');
      assert(typeof dba.getAdapter() === 'object');
    }catch(e){
      console.log('e', e);
      expect(() => { new DbAdapter('mysql') }).to.throw("Cannot find module \'mysql\'");
    }
  });

  it('setDbType() empty - mysql', function() {
    dba = new DbAdapter().setDbType();
    assert.equal(dba.getDbType(), 'mysql');
    assert(typeof dba.getAdapter() === 'object');
    assert(dba instanceof DbAdapter);
  });

  it('getDbType()', function() {
    dba = new DbAdapter();
    var obj = dba.getDbType();
    assert.equal(dba.getDbType(), 'mysql');
    assert(typeof dba.getAdapter() === 'object');
  });

  it('getAdapter() - + mysql module installation check', function() {
    try {
      dba = new DbAdapter();
      assert(dba instanceof DbAdapter);
      assert(typeof dba.getAdapter() === 'object');
    }catch(e){
      console.log('e', e);
      expect(() => { new DbAdapter('mysql') }).to.throw("Cannot find module \'mysql\'");
    }
  });

  it('setConnection() - invalid', function() {
    expect(() => { new DbAdapter().setConnection() }).to.throw("Connection is not valid object");
  });

  it('setConnection() - valid', function() {
    dba = new DbAdapter();
    dba.setConnection(mocks.DB.connection);
    assert(typeof dba.getConnection() === 'object');
    assert(typeof dba.getConfig() === 'object');
  });
});
