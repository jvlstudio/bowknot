(function($){$.extend($.fn,{upload:{version:"0.0.0.3",author:"lly219@gmail.com"},upload:function(options){if(arguments.length===1&&typeof options=="string"){var method=options.charAt(0).toUpperCase()+options.substr(1,options.length-1);return $.fn["uploadify"+method].apply(this)}$(this).each(function(){var settings=$.extend({id:$(this).attr("id"),uploader:"upload.swf",script:"uploadOrRemoveFile?operate=flashUpload",expressInstall:null,folder:"",height:30,width:120,cancelImg:"cancel.png",wmode:"opaque",scriptAccess:"sameDomain",fileDataName:"Filedata",method:"POST",queueSizeLimit:999,simUploadLimit:1,queueID:!1,displayData:"percentage",removeCompleted:!0,onInit:function(){},onSelect:function(){},onSelectOnce:function(){},onQueueFull:function(){},onCheck:function(){},onCancel:function(){},onClearQueue:function(){},onError:function(){},onProgress:function(){},onComplete:function(){},onAllComplete:function(){}},options);$(this).data("settings",settings);var pagePath=location.pathname;pagePath=pagePath.split("/"),pagePath.pop(),pagePath=pagePath.join("/")+"/";var data={};data.uploadifyID=settings.id,data.pagepath=pagePath,settings.buttonImg&&(data.buttonImg=escape(settings.buttonImg)),settings.buttonText&&(data.buttonText=escape(settings.buttonText)),settings.rollover&&(data.rollover=!0),data.script=settings.script,data.folder=escape(settings.folder);if(settings.scriptData){var scriptDataString="";for(var name in settings.scriptData)scriptDataString+="&"+name+"="+settings.scriptData[name];data.scriptData=escape(scriptDataString.substr(1))}data.width=settings.width,data.height=settings.height,data.wmode=settings.wmode,data.method=settings.method,data.queueSizeLimit=settings.queueSizeLimit,data.simUploadLimit=settings.simUploadLimit,settings.hideButton&&(data.hideButton=!0),settings.fileDesc&&(data.fileDesc=settings.fileDesc),settings.fileExt&&(data.fileExt=settings.fileExt),settings.multi&&(data.multi=!0),settings.auto&&(data.auto=!0),settings.sizeLimit&&(data.sizeLimit=settings.sizeLimit),settings.checkScript&&(data.checkScript=settings.checkScript),settings.fileDataName&&(data.fileDataName=settings.fileDataName),settings.queueID&&(data.queueID=settings.queueID),settings.onInit()!==!1&&($(this).css("display","none"),$(this).after('<div id="'+$(this).attr("id")+'Uploader"></div>'),swfobject.embedSWF(settings.uploader,settings.id+"Uploader",settings.width,settings.height,"9.0.24",settings.expressInstall,data,{quality:"high",wmode:settings.wmode,allowScriptAccess:settings.scriptAccess},{},function(a){typeof settings.onSWFReady=="function"&&a.success&&settings.onSWFReady()}),settings.queueID==!1?$("#"+$(this).attr("id")+"Uploader").after('<div id="'+$(this).attr("id")+'Queue" class="uploadifyQueue"></div>'):$("#"+settings.queueID).addClass("uploadifyQueue")),typeof settings.onOpen=="function"&&$(this).bind("uploadifyOpen",settings.onOpen),$(this).bind("uploadifySelect",{action:settings.onSelect,queueID:settings.queueID},function(a,b,c){if(a.data.action(a,b,c)!==!1){var d=Math.round(c.size/1024*100)*.01,e="KB";d>1e3&&(d=Math.round(d*.001*100)*.01,e="MB");var f=d.toString().split(".");f.length>1?d=f[0]+"."+f[1].substr(0,2):d=f[0],c.name.length>20?fileName=c.name.substr(0,20)+"...":fileName=c.name,queue="#"+$(this).attr("id")+"Queue",a.data.queueID&&(queue="#"+a.data.queueID),$(queue).append('<div id="'+$(this).attr("id")+b+'" class="uploadifyQueueItem">\n                                            <div class="upload-left"></div>\n                                            <div class="upload-middle">\n                                                <a class="cancel" href="javascript:jQuery(\'#'+jQuery(this).attr("id")+"').uploadifyCancel('"+b+'\')"></a>\n                                                <span class="icon"></span><span class="fileName">'+fileName+" ("+d+e+')</span><span class="percentage"></span>\n                                                <div class="uploadifyProgress">\n                                                    <div id="'+jQuery(this).attr("id")+b+'ProgressBar" class="uploadifyProgressBar"><!--Progress Bar--></div>\n                                                </div>\n                                            </div>\n                                            <div class="upload-right"></div>\n                                            <div class="upload-clear"></div>\n                                         </div>')}}),$(this).bind("uploadifySelectOnce",{action:settings.onSelectOnce},function(a,b){a.data.action(a,b),settings.auto&&(settings.checkScript?$(this).uploadifyUpload(null,!1):$(this).uploadifyUpload(null,!0))}),$(this).bind("uploadifyQueueFull",{action:settings.onQueueFull},function(a,b){a.data.action(a,b)!==!1&&alert("The queue is full.  The max size is "+b+".")}),$(this).bind("uploadifyCheckExist",{action:settings.onCheck},function(a,b,c,d,e){var f=new Object;f=c,f.folder=d.substr(0,1)=="/"?d:pagePath+d;if(e)for(var g in c)var h=g;$.post(b,f,function(b){for(var c in b)if(a.data.action(a,b,c)!==!1){var d=confirm("Do you want to replace the file "+b[c]+"?");d||document.getElementById($(a.target).attr("id")+"Uploader").cancelFileUpload(c,!0,!0)}e?document.getElementById($(a.target).attr("id")+"Uploader").startFileUpload(h,!0):document.getElementById($(a.target).attr("id")+"Uploader").startFileUpload(null,!0)},"json")}),$(this).bind("uploadifyCancel",{action:settings.onCancel},function(a,b,c,d,e,f){if(a.data.action(a,b,c,d,f)!==!1&&e){var g=f==!0?0:250;$("#"+$(this).attr("id")+b).fadeOut(g,function(){$(this).removeData("response").remove()})}}),$(this).bind("uploadifyClearQueue",{action:settings.onClearQueue},function(a,b){var c=settings.queueID?settings.queueID:$(this).attr("id")+"Queue";b&&$("#"+c).find(".uploadifyQueueItem").remove(),a.data.action(a,b)!==!1&&$("#"+c).find(".uploadifyQueueItem").each(function(){var a=$(".uploadifyQueueItem").index(this);$(this).delay(a*100).fadeOut(250,function(){$(this).remove()})})});var errorArray=[];$(this).bind("uploadifyError",{action:settings.onError},function(a,b,c,d){if(a.data.action(a,b,c,d)!==!1){var e=[b,c,d];errorArray.push(e),$("#"+$(this).attr("id")+b).find(".percentage").text(" - "+d.type+" Error"),$("#"+$(this).attr("id")+b).find(".uploadifyProgress").hide(),$("#"+$(this).attr("id")+b).addClass("uploadifyError")}}),typeof settings.onUpload=="function"&&$(this).bind("uploadifyUpload",settings.onUpload),$(this).bind("uploadifyProgress",{action:settings.onProgress,toDisplay:settings.displayData},function(a,b,c,d){a.data.action(a,b,c,d)!==!1&&($("#"+$(this).attr("id")+b+"ProgressBar").animate({width:d.percentage+"%"},250,function(){d.percentage==100&&$(this).closest(".uploadifyProgress").fadeOut(250,function(){$(this).remove()})}),a.data.toDisplay=="percentage"&&(displayData=" - "+d.percentage+"%"),a.data.toDisplay=="speed"&&(displayData=" - "+d.speed+"KB/s"),a.data.toDisplay==null&&(displayData=" "),$("#"+$(this).attr("id")+b).find(".percentage").text(displayData))}),$(this).bind("uploadifyComplete",{action:settings.onComplete},function(event,ID,fileObj,response,data){var responseArray=eval(unescape(response));event.data.action(event,ID,fileObj,responseArray,data)!==!1&&($("#"+$(this).attr("id")+ID).find(".percentage").text(" - 上传完成"),settings.removeCompleted&&$("#"+$(event.target).attr("id")+ID).fadeOut(250,function(){$(this).remove()}),$("#"+$(event.target).attr("id")+ID).addClass("completed").data("response",responseArray))}),typeof settings.onAllComplete=="function"&&$(this).bind("uploadifyAllComplete",{action:settings.onAllComplete},function(a,b){a.data.action(a,b)!==!1&&(errorArray=[])})})},uploadifySettings:function(a,b,c){var d=!1;$(this).each(function(){if(a=="scriptData"&&b!=null){if(c)var e=b;else var e=$.extend($(this).data("settings").scriptData,b);var f="";for(var g in e)f+="&"+g+"="+e[g];b=escape(f.substr(1))}d=document.getElementById($(this).attr("id")+"Uploader").updateSettings(a,b)});if(b==null&&a=="scriptData"){var e=unescape(d).split("&"),f=new Object;for(var g=0;g<e.length;g++){var h=e[g].split("=");f[h[0]]=h[1]}d=f}return d},uploadifyUpload:function(a,b){$(this).each(function(){b||(b=!1),document.getElementById($(this).attr("id")+"Uploader").startFileUpload(a,b)})},uploadifyCancel:function(a){$(this).each(function(){document.getElementById($(this).attr("id")+"Uploader").cancelFileUpload(a,!0,!0,!1)})},uploadifyClearQueue:function(){$(this).each(function(){document.getElementById($(this).attr("id")+"Uploader").clearFileUploadQueue(!1)})}})})(jQuery)