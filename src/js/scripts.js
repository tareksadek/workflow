global.$ = require('jquery');
bootstrap = require('bootstrap');
popper = require('popper.js/dist/umd/popper.min.js');
mustache = require('mustache');

$('document').ready(function($){
	var jqxhr = $.getJSON('data.json', function(){
		
	}).done(function(data){
		var template = $('#template').html();
		var showTemplate = mustache.render(template, data);
		$('#gallery').html(showTemplate);
	});
});