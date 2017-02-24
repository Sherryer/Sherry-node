'use strict';
const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const iconv = require('iconv-lite');
const BufferHelper = require('bufferhelper');
let i = 0;
let url = 'http://www.mm131.com/xinggan/1002.html'; 
let startUrl = 1002;

var mainFun = (url)=>{
    http.get(url,(res)=>{
        let bufferHelper = new BufferHelper();
        res.on('data',(chunk)=>{
            bufferHelper.concat(chunk);
        })
        res.on('end',()=>{
            let $ = cheerio.load(iconv.decode(bufferHelper.toBuffer(),'gbk'));
            let imgLink = $(".content-pic img").attr("src");
            let imgTitle = $(".content-pic img").attr("alt");
            downloadImg(imgLink,imgTitle);
            let nextLink;
            if(!/您访问的页面不存在/.test($('strong').eq(0).text()) && $('.page-ch:last-child').is('a')){
                nextLink = 'http://www.mm131.com/xinggan/' + $('.page-ch:last-child').attr('href');
            }
            else{
                nextLink = 'http://www.mm131.com/xinggan/' + ++startUrl +'.html';
            }
            if(i < 500){
                mainFun(nextLink);
            }
        })
    })
}


var downloadImg = (link,title)=>{
    if(link === undefined){
        return;
    }
    request.head(link,function(err,res,body){
        if(err){
            console.log(err);
        }
        i++;
        console.log(`下载了大概${i}个`);
    });
    request(link).pipe(fs.createWriteStream('./image/'+title + '.jpg'));
}

mainFun(url);