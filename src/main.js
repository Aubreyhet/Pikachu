import '../node_modules/bootstrap/dist/css/bootstrap.css'
import $ from 'jquery'

$(function(){
    $('li:odd').css('backgroundColor', 'red')
    $('li:even').css('backgroundColor', 'yellow')
})