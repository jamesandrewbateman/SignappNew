var shiftHeld=!1,initialLoad=!0;init_refinery_admin=function(){init_interface(),init_sortable_menu(),init_submit_continue(),init_modal_dialogs(),init_tooltips(),init_ajaxy_pagination()},$(document).ready(init_refinery_admin),"object"==typeof window.onpopstate&&$(window).bind("popstate",function(){initialLoad||$(document).paginateTo(location.pathname+location.href.split(location.pathname)[1]),initialLoad=!1}),$.fn.paginateTo=function(e){$.ajax({url:e,cache:!1,success:function(e){$(".pagination_container").slideTo(e),$(".pagination_container .pagination a").each(function(){$(this).attr("href",$(this).attr("href").replace(/\?\_\=[^&]+&/,"?"))})},failure:function(){window.location=popstate_location}})},$.fn.slideTo=function(e){return $(this).html(e),$(this).applyMinimumHeightFromChildren(),$(this).find(".pagination_frame").removeClass("frame_right").addClass("frame_center"),init_modal_dialogs(),init_tooltips(),$(this)},$.fn.applyMinimumHeightFromChildren=function(){return child_heights=0,$(this).children().each(function(e,t){child_heights+=$(t).height(),$.each(["marginTop","marginBottom","paddingTop","paddingBottom"],function(e,i){child_heights+=parseInt($(t).css(i))||0})}),$(this).css("min-height",child_heights),$(this)},init_modal_dialogs=function(){$('a[href*="dialog=true"]').not("#dialog_container a").each(function(e,t){$(t).data({"dialog-width":parseInt($($(t).attr("href").match("width=([0-9]*)")).last().get(0),10)||928,"dialog-height":parseInt($($(t).attr("href").match("height=([0-9]*)")).last().get(0),10)||473,"dialog-title":$(t).attr("title")||$(t).attr("name")||$(t).html()||null}).attr("href",$(t).attr("href").replace(/(&(amp;)?|\?)(dialog=true|(width|height)=\d+)/g,"").replace(/(\/[^&\?]*)&(amp;)?/,"$1?")).click(function(e){$anchor=$(this),iframe_src=(iframe_src=$anchor.attr("href"))+(iframe_src.indexOf("?")>-1?"&":"?")+"app_dialog=true&dialog=true",iframe=$("<iframe id='dialog_iframe' frameborder='0' marginheight='0' marginwidth='0' border='0'></iframe>"),$.browser.msie||iframe.corner("8px"),iframe.dialog({title:$anchor.data("dialog-title"),modal:!0,resizable:!1,autoOpen:!0,width:$anchor.data("dialog-width"),height:$anchor.data("dialog-height"),open:onOpenDialog,close:onCloseDialog}),iframe.attr("src",iframe_src),e.preventDefault()})})},refinery_dialog_success=function(){close_dialog(),$.ajax({url:window.location.pathname,cache:!1,success:function(e){$(".pagination_container").html(e),$("#flash_container > #flash").remove(),$("#flash_container").append($(".pagination_container").find("#flash")),$("#flash").css({width:"auto",visibility:""}).fadeIn(550),init_refinery_admin()}})},trigger_reordering=function(e,t){$menu=$("#menu"),e.preventDefault(),$("#menu_reorder, #menu_reorder_done").toggle(),$("#site_bar, #content").fadeTo(500,t?.35:1),t?$menu.find(".tab a").click(function(e){e.preventDefault()}):$menu.find(".tab a").unbind("click"),$menu.sortable(t?"enable":"disable")},trigger_reordering_content_section=function(e,t){$menu=$("#page-tabs"),e.preventDefault(),$("#reorder_page_part, #reorder_page_part_done").toggle(),$("#site_bar, #menu, .field:not(:has(#page-tabs)), .page_part, #more_options_field, .form-actions").fadeTo(500,t?.35:1),t?$menu.addClass("reordering").find(".tab a").click(function(e){e.preventDefault()}):$menu.removeClass("reordering").find(".tab a").unbind("click"),$menu.sortable(t?"enable":"disable").sortable({items:"li",stop:function(){$("#page-tabs li[data-index]").each(function(e){$("#page_parts_attributes_"+$(this).data("index")+"_position").val(e+1)})}})},submit_and_continue=function(e,t){$(this).hasClass("wymupdate")&&$.each(WYMeditor.INSTANCES,function(e,t){t.update()}),$("#continue_editing").val(!0),$("#flash").fadeOut(250),$(".fieldWithErrors").removeClass("fieldWithErrors").addClass("field"),$("#flash_container .errorExplanation").remove(),$.post($("#continue_editing").get(0).form.action,$($("#continue_editing").get(0).form).serialize(),function(e){($flash_container=$("#flash_container")).length>0&&($flash_container.html(e),$("#flash").css({width:"auto",visibility:null}).fadeIn(550),$(".errorExplanation").not($("#flash_container .errorExplanation")).remove(),null!=(error_fields=$("#fieldsWithErrors").val())?$.each(error_fields.split(","),function(){$("#"+this).wrap("<div class='fieldWithErrors' />")}):t&&(window.location=t),$(".fieldWithErrors:first :input:first").focus(),$("#continue_editing").val(!1),init_flash_messages(),$("form").attr("action",$("#new_action").attr("value")))},"html"),e.preventDefault()},init_tooltips=function(e){$($(null!=e?e:"a[title], span[title], #image_grid img[title], *[tooltip]")).not(".no-tooltip").each(function(e,t){$(t).hover(function(e){"mouseenter"==e.type||"mouseover"==e.type?$(this).oneTime(350,"tooltip",$.proxy(function(){$(".tooltip").remove(),tooltip=$("<div class='tooltip'><div><span></span></div></div>").appendTo("#tooltip_container"),tooltip.find("span").html($(this).attr("tooltip")),$.browser.msie||tooltip.corner("6px").find("span").corner("6px"),tooltip_nib_extension=$.browser.msie?".gif":".png",nib=$("<img src='/assets/refinery/tooltip-nib"+tooltip_nib_extension+"' class='tooltip-nib'/>").appendTo("#tooltip_container"),tooltip.css({opacity:0,maxWidth:"300px"}),required_left_offset=$(this).offset().left-tooltip.outerWidth()/2+$(this).outerWidth()/2,tooltip.css("left",required_left_offset>0?required_left_offset:0);var e=tooltip.offset(),t=tooltip.outerWidth();e&&e.left+t>(window_width=$(window).width())&&tooltip.css("left",window_width-t),tooltip.css({top:$(this).offset().top-tooltip.outerHeight()-10}),nib.css({opacity:0}),(e=tooltip.offset())&&nib.css({left:$(this).offset().left+$(this).outerWidth()/2-5,top:e.top+tooltip.height()});try{tooltip.animate({top:e.top-10,opacity:1},200,"swing"),nib.animate({top:nib.offset().top-10,opacity:1},200)}catch(i){tooltip.show(),nib.show()}},$(this))):("mouseleave"==e.type||"mouseout"==e.type)&&($(this).stopTime("tooltip"),null==(tt_offset=(tooltip=$(".tooltip")).css("z-index","-1").offset())&&(tt_offset={top:0,left:0}),tooltip.animate({top:tt_offset.top-20,opacity:0},125,"swing",function(){$(this).remove()}),null==(nib_offset=(nib=$(".tooltip-nib")).offset())&&(nib_offset={top:0,left:0}),nib.animate({top:nib_offset.top-20,opacity:0},125,"swing",function(){$(this).remove()}))}).click(function(){$(this).stopTime("tooltip")}),null==$(t).attr("tooltip")&&$(t).attr("tooltip",$(t).attr("title")),$elements=$(t).add($(t).children("img")).removeAttr("title"),$.browser.msie&&$elements.removeAttr("alt")})};var link_tester={initialised:!1,init:function(e,t){this.initialised||(this.test_url=e,this.test_email=t,this.initialised=!0)},email:function(e,t){""!=e&&$.getJSON(link_tester.test_email,{email:e},function(e){t("success"==e.result)})},url:function(e,t){""!=e&&$.getJSON(link_tester.test_url,{url:e},function(e){t("success"==e.result)})},validate_textbox:function(e,t,i){var a="",n=$("<img id='"+t.replace("#","")+"_test_loader' src='/assets/refinery/ajax-loader.gif' alt='Testing...' style='display: none;'/>"),o=$("<span id='"+t.replace("#","")+"_test_result'></span>");n.insertAfter($(t)),o.insertAfter(n),$(t).bind("paste blur",function(){$(t).stop(!0),$(t+"_test_loader").hide(),$(t+"_test_result").hide(),$(t+"_test_result").removeClass("success_icon").removeClass("failure_icon"),""!=this.value&&"/"!=this.value[0]&&$(t).delay(300).queue(function(){$(t+"_test_loader").show(),$(t+"_test_result").hide(),$(t+"_test_result").removeClass("success_icon").removeClass("failure_icon"),e(this.value,function(e){a=e?"success_icon":"failure_icon",$(t+"_test_result").addClass(a).show(),$(t+"_test_loader").hide()}),i&&i($(t)),$(this).dequeue()})})},validate_url_textbox:function(e,t){link_tester.validate_textbox(link_tester.url,e,t)},validate_email_textbox:function(e,t){link_tester.validate_textbox(link_tester.email,e,t)}},link_dialog={initialised:!1,init:function(){this.initialised||(this.init_tabs(),this.init_resources_submit(),this.init_close(),this.page_tab(),this.web_tab(),this.email_tab(),this.initialised=!0)},init_tabs:function(){var e=$("#dialog_menu_left input:radio"),t=e.parent().filter(".selected_radio").find("input:radio").first()||e.first();e.click(function(){link_dialog.switch_area($(this))}),t.attr("checked","true"),link_dialog.switch_area(t)},init_resources_submit:function(){$("#existing_resource_area .form-actions-dialog #submit_button").click(function(e){e.preventDefault(),(resource_selected=$("#existing_resource_area_content ul li.linked a")).length>0&&(resourceUrl=parseURL(resource_selected.attr("href")),relevant_href=resourceUrl.pathname,resourceUrl.hostname.match(/s3.amazonaws.com/)&&(relevant_href=resourceUrl.protocol+"//"+resourceUrl.host+relevant_href),"function"==typeof resource_picker.callback&&resource_picker.callback({id:resource_selected.attr("id").replace("resource_",""),href:relevant_href,html:resource_selected.html()})),$(".form-actions-dialog #cancel_button").trigger("click")})},init_close:function(){$(".form-actions-dialog #cancel_button").not(".wym_iframe_body .form-actions-dialog #cancel_button").click(close_dialog),parent&&parent.document.location.href!=document.location.href&&null!=parent.document.getElementById("wym_dialog_submit")&&($("#dialog_container .form-actions input#submit_button").click(function(e){e.preventDefault(),$(parent.document.getElementById("wym_dialog_submit")).click()}),$("#dialog_container .form-actions a.close_dialog").click(close_dialog))},switch_area:function(e){$("#dialog_menu_left .selected_radio").removeClass("selected_radio"),$(e).parent().addClass("selected_radio"),$("#dialog_main .dialog_area").hide(),$("#"+$(e).val()+"_area").show()},page_tab:function(){$(".link_list li").click(function(e){e.preventDefault(),$(".link_list li.linked").removeClass("linked"),$(this).addClass("linked");var t=$(this).children("a.page_link").get(0),i=window.location.port.length>0?":"+window.location.port:"",a=t.href.replace(window.location.protocol+"//"+window.location.hostname+i,"");link_dialog.update_parent(a,t.rel.replace(/\ ?<em>.+?<\/em>/,""))})},web_tab:function(){link_tester.validate_url_textbox("#web_address_text",function(){}),$("#web_address_text, #web_address_target_blank").change(function(){link_dialog.update_parent($("#web_address_text").val(),$("#web_address_text").val(),$("#web_address_target_blank").get(0).checked?"_blank":"")})},email_tab:function(){link_tester.validate_email_textbox("#email_address_text",function(){}),$("#email_address_text, #email_default_subject_text, #email_default_body_text").change(function(){var e=$("#email_default_subject_text").val(),t=$("#email_default_body_text").val(),i=$("#email_address_text").val();modifier="?",additional="",e.length>0&&(additional+=modifier+"subject="+e,modifier="&"),t.length>0&&(additional+=modifier+"body="+t,modifier="&");for(var a="",n=0;n<i.length;n++)a+="%"+i.charCodeAt(n).toString(16);link_dialog.update_parent("mailto:"+a+additional,i)})},update_parent:function(e,t,i){null!=parent&&(null!=(wym_href=parent.document.getElementById("wym_href"))&&(wym_href.value=e),null!=(wym_title=parent.document.getElementById("wym_title"))&&(wym_title.value=t),null!=(wym_target=parent.document.getElementById("wym_target"))&&(wym_target.value=i||""))}},page_options={initialised:!1,init:function(e,t,i){this.initialised||(page_options.tabs=$("#page-tabs"),page_options.tabs.tabs({tabTemplate:'<li><a href="#{href}">#{label}</a></li>'}),page_options.tabs.find(" > ul li a").corner("top 5px"),part_shown=$("#page-tabs .page_part.field").not(".ui-tabs-hide"),$("#page-tabs .page_part.field").removeClass("ui-tabs-hide"),this.enable_parts=e,this.new_part_url=t,this.del_part_url=i,this.show_options(),$(document).ready($.proxy(function(){$("#page-tabs .page_part.field").not(this).addClass("ui-tabs-hide"),$("#page-tabs > ul li a").corner("top 5px")},part_shown)),this.enable_parts&&this.page_part_dialog(),this.initialised=!0)},show_options:function(){$("#toggle_advanced_options").click(function(e){e.preventDefault(),$("#more_options").animate({opacity:"toggle",height:"toggle"},250),$("html,body").animate({scrollTop:$("#toggle_advanced_options").parent().offset().top},250)})},page_part_dialog:function(){$("#new_page_part_dialog").dialog({title:"Create Content Section",modal:!0,resizable:!1,autoOpen:!1,width:600,height:200}),$("#add_page_part").click(function(e){e.preventDefault(),$("#new_page_part_dialog").dialog("open")}),$("#new_page_part_save").click(function(e){e.preventDefault();var t=$("#new_page_part_title").val();if(t.length>0){var i=t.toLowerCase().replace(" ","_");0===$("#part_"+i).size()?$.get(page_options.new_part_url,{title:t,part_index:$("#new_page_part_index").val(),body:""},function(e){$("#submit_continue_button").remove(),$("#page_part_editors").append(e),page_options.tabs.tabs("add","#page_part_new_"+$("#new_page_part_index").val(),t),page_options.tabs.tabs("select",$("#new_page_part_index").val()),WYMeditor.onload_functions.push(function(){page_options.tabs.tabs("select",$("#new_page_part_index").val())}),$("#page_part_new_"+$("#new_page_part_index").val()).appendTo("#page_part_editors"),WYMeditor.init(),$("#new_page_part_index").val(parseInt($("#new_page_part_index").val(),10)+1),$("#new_page_part_title").val(""),page_options.tabs.find("> ul li a").corner("top 5px"),$("#new_page_part_dialog").dialog("close")},"html"):alert("A content section with that title already exists, please choose another.")}else alert("You have not entered a title for the content section, please enter one.")}),$("#new_page_part_cancel").click(function(e){e.preventDefault(),$("#new_page_part_dialog").dialog("close"),$("#new_page_part_title").val("")}),$("#delete_page_part").click(function(e){if(e.preventDefault(),confirm("This will remove the content section '"+$("#page_parts .ui-tabs-selected a").text()+"' immediately even if you don't save this page, are you sure?")){var t=page_options.tabs.tabs("option","selected");$.ajax({url:page_options.del_part_url+"/"+$("#page_parts_attributes_"+t+"_id").val(),type:"DELETE"}),page_options.tabs.tabs("remove",t),$("#page_parts_attributes_"+t+"_id").remove(),$("#submit_continue_button").remove()}}),$("#reorder_page_part").click(function(e){trigger_reordering_content_section(e,!0)}),$("#reorder_page_part_done").click(function(e){trigger_reordering_content_section(e,!1)})}},image_dialog={initialised:!1,callback:null,init:function(e){return this.initialised||(this.callback=e,this.init_tabs(),this.init_select(),this.init_actions(),this.initialised=!0),this},init_tabs:function(){var e=$("#dialog_menu_left input:radio"),t=e.parent().filter(".selected_radio").find("input:radio").first()||e.first();e.click(function(){link_dialog.switch_area($(this))}),t.attr("checked","true"),link_dialog.switch_area(t)},switch_area:function(e){$("#dialog_menu_left .selected_radio").removeClass("selected_radio"),$(e).parent().addClass("selected_radio"),$("#dialog_main .dialog_area").hide(),$("#"+e.value+"_area").show()},init_select:function(){$("#existing_image_area_content ul li img").click(function(){image_dialog.set_image(this)}),(selected_img=$("#existing_image_area_content ul li.selected img")).length>0&&image_dialog.set_image(selected_img.first())},set_image:function(e){if($(e).length>0){$("#existing_image_area_content ul li.selected").removeClass("selected"),$(e).parent().addClass("selected");var t=($(e).attr("data-id"),$("#existing_image_size_area li.selected a").attr("data-geometry")),i=$("#existing_image_size_area li.selected a").attr("data-size"),a=$("#wants_to_resize_image").is(":checked");image_url=$(e).attr(a?"data-"+i:"data-original"),parent&&(null!=(wym_src=parent.document.getElementById("wym_src"))&&(wym_src.value=image_url),null!=(wym_title=parent.document.getElementById("wym_title"))&&(wym_title.value=$(e).attr("title")),null!=(wym_alt=parent.document.getElementById("wym_alt"))&&(wym_alt.value=$(e).attr("alt")),null!=(wym_size=parent.document.getElementById("wym_size"))&&"undefined"!=typeof t&&(wym_size.value=t.replace(/[<>=]/g,"")))}},submit_image_choice:function(e){e.preventDefault(),(img_selected=$("#existing_image_area_content ul li.selected img").get(0))&&$.isFunction(this.callback)&&this.callback(img_selected),close_dialog(e)},init_actions:function(){var e=this;$("#existing_image_area .form-actions-dialog #submit_button").not(".wym_iframe_body #existing_image_area .form-actions-dialog #submit_button").click($.proxy(e.submit_image_choice,e)),$(".form-actions-dialog #cancel_button").not(".wym_iframe_body .form-actions-dialog #cancel_button").click($.proxy(close_dialog,e)),$("#existing_image_size_area ul li a").click(function(e){$("#existing_image_size_area ul li").removeClass("selected"),$(this).parent().addClass("selected"),$("#existing_image_size_area #wants_to_resize_image").attr("checked","checked"),image_dialog.set_image($("#existing_image_area_content ul li.selected img")),e.preventDefault()}),$("#existing_image_size_area #wants_to_resize_image").change(function(){$(this).is(":checked")?$("#existing_image_size_area ul li:first a").click():($("#existing_image_size_area ul li").removeClass("selected"),image_dialog.set_image($("#existing_image_area_content ul li.selected img")))}),image_area=$("#existing_image_area").not("#wym_iframe_body #existing_image_area"),image_area.find(".form-actions input#submit_button").click($.proxy(function(e){e.preventDefault(),$(this.document.getElementById("wym_dialog_submit")).click()},parent)),image_area.find(".form-actions a.close_dialog").click(close_dialog)}},list_reorder={initialised:!1,init:function(){this.initialised||($("#reorder_action").click(list_reorder.enable_reordering),$("#reorder_action_done").click(list_reorder.disable_reordering),list_reorder.tree===!1&&list_reorder.sortable_list.find("li").addClass("no-nest"),list_reorder.sortable_list.nestedSortable({listType:"ul",disableNesting:"no-nest",forcePlaceholderSize:!0,handle:list_reorder.tree?"div":null,items:"li",opacity:.6,placeholder:"placeholder",tabSize:25,tolerance:"pointer",toleranceElement:list_reorder.tree?"> div":null,disabled:!0,start:function(){},change:function(){list_reorder.tree&&list_reorder.reset_branch_classes(this)},stop:function(){list_reorder.tree?(list_reorder.reset_branch_classes(this),list_reorder.reset_icon_classes(this)):list_reorder.reset_on_off_classes(this)}}),list_reorder.tree?list_reorder.reset_branch_classes(list_reorder.sortable_list):list_reorder.reset_on_off_classes(list_reorder.sortable_list),this.initialised=!0)},reset_on_off_classes:function(e){$("> li",e).each(function(e,t){$(t).removeClass("on off on-hover").addClass(e%2===0?"on":"off")})},reset_branch_classes:function(e){$("li.ui-sortable-helper",this).removeClass("record").removeClass("branch_start").removeClass("branch_end"),$("li",e).removeClass("branch_start").removeClass("branch_end"),$("> li:first",e).addClass("branch_start"),$("> li:last",e).addClass("branch_end");var t=$("ul",e);$("> li:last",t).addClass("branch_end")},reset_icon_classes:function(e){$("li",e).each(function(){var e=$(this),t=e.find(".icon:first");e.find("ul li").size()>0?t.addClass("toggle expanded"):t.hasClass("expanded")&&t.removeClass("toggle expanded")})},enable_reordering:function(e){e&&e.preventDefault(),$("#sortable_list, .sortable_list").addClass("reordering"),$("#sortable_list .actions, .sortable_list .actions, #site_bar, header > *:not(script)").fadeTo(500,.3),$('#actions *:not("#reorder_action_done, #reorder_action")').not($("#reorder_action_done").parents("li, ul, div")).fadeTo(500,.55),list_reorder.sortable_list.nestedSortable("enable"),$("#reorder_action").hide(),$("#reorder_action_done").show()},disable_reordering:function(e){if(e&&e.preventDefault(),$("#reorder_action_done").hasClass("loading"))return!1;if($("#reorder_action_done").addClass("loading"),list_reorder.sortable_list.nestedSortable("disable"),$("#sortable_list, .sortable_list").removeClass("reordering"),null!==list_reorder.update_url){var t=list_reorder.sortable_list.serializelist();$.post(list_reorder.update_url,t,function(){list_reorder.restore_controls(e)})}else list_reorder.restore_controls(e)},restore_controls:function(){$(list_reorder.sortable_list).removeClass("reordering"),$("#sortable_list .actions, .sortable_list .actions, #site_bar, header > *:not(script)").fadeTo(250,1),$('#actions *:not("#reorder_action_done, #reorder_action")').not($("#reorder_action_done").parents("li, ul, div")).fadeTo(250,1,function(){$("#reorder_action_done").hide().removeClass("loading"),$("#reorder_action").show()})}},image_picker={initialised:!1,options:{selected:"",thumbnail:"medium",field:"#image",image_display:".current_picked_image",no_image_message:".no_picked_image_selected",image_container:".current_image_container",remove_image_button:".remove_picked_image",picker_container:".image_picker_container",image_link:".current_image_link",image_toggler:null},init:function(e){return this.initialised||(this.options=$.extend(this.options,e),$(this.options.picker_container).find(this.options.remove_image_button).click($.proxy(this.remove_image,{container:this.options.picker_container,picker:this})),$(this.options.picker_container).find(this.options.image_toggler).click($.proxy(this.toggle_image,{container:this.options.picker_container,picker:this})),this.initialised=!0),this},remove_image:function(e){e.preventDefault(),$(this.container).find(this.picker.options.image_display).removeClass("brown_border").attr({src:"",width:"",height:""}).css({width:"auto",height:"auto"}).hide(),$(this.container).find(this.picker.options.field).val("").trigger("change"),$(this.container).find(this.picker.options.no_image_message).show(),$(this.container).find(this.picker.options.remove_image_button).hide()},toggle_image:function(e){$(this.container).find(this.options.image_toggler).html("Show"==$(this.container).find(options.image_toggler).html()?"Hide":"Show"),$(this.container).find(this.options.image_container).toggle(),e.preventDefault()},changed:function(){$(this.container).find(this.picker.options.field).val(this.image.id.replace("image_","")).trigger("change");var e=this.picker.options.thumbnail||"original";this.image.src=$(this.image).attr("data-"+e),current_image=$(this.container).find(this.picker.options.image_display),current_image.replaceWith($("<img src='"+this.image.src+"?"+Math.floor(1e5*Math.random())+"' id='"+current_image.attr("id")+"' class='"+this.picker.options.image_display.replace(/^./,"")+" brown_border' />")),$(this.container).find(this.picker.options.remove_image_button).show(),$(this.container).find(this.picker.options.no_image_message).hide()}},resource_picker={initialised:!1,callback:null,init:function(e){this.initialised||(this.callback=e,this.initialised=!0)}};close_dialog=function(e){iframed()?(the_body=$(parent.document.body),the_dialog=parent.$(".ui-dialog-content")):(the_body=$(document.body).removeClass("hide-overflow"),the_dialog=$(".ui-dialog-content"),the_dialog.filter(":data(dialog)").dialog("close"),the_dialog.remove()),$(document.body).hasClass("wym_iframe_body")||(the_body.removeClass("hide-overflow"),the_dialog.filter(":data(dialog)").dialog("close"),the_dialog.remove(),e&&e.preventDefault&&e.preventDefault())},parseURL=function(e){var t={href:e},i=e.replace("//","/").split("/");t.protocol=i[0],t.host=i[1],i[1]=i[1].split(":"),t.hostname=i[1][0],t.port=i[1].length>1?i[1][1]:"",i.splice(0,2),t.pathname="/"==t.href[0]?"/"+t.host:"",t.pathname+="/"+i.join("/"),t.pathname=t.pathname.split("#"),t.hash=t.pathname.length>1?"#"+t.pathname[1]:"",t.pathname=t.pathname[0],t.pathname=t.pathname.split("?"),t.search=t.pathname.length>1?"?"+t.pathname[1]:"",t.pathname=t.pathname[0];var a=e.split("?")[1];return t.options=a,t},iframed=function(){return parent&&parent.document&&parent.document.location.href!=document.location.href&&$.isFunction(parent.$)};