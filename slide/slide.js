// this is data(ajax request)
const data = [
   {img:1,h2:'Creative',h3:'DUET'},
   {img:2,h2:'Friendly',h3:'DEVIL'},
   {img:3,h2:'Tranquilent',h3:'COMPATRIOT'},
   {img:4,h2:'Hot',h3:'YOUTH'},
   {img:5,h2:'Loving',h3:'REBEL'},
   {img:6,h2:'Passionate',h3:'SEEKER'},
   {img:7,h2:'Crazy',h3:'FRIEND'},
];
// all 
function g(idClass) {
  let method = idClass.substr(0,1) == '.' ? 'getElementsByClassName'
                                           : 'getElementById';
  return document[method](idClass.substr(1));	
}

function addSliders(){
	 const tpl_main = g('#template_main').innerHTML
	                                   .replace(/^\s*/,'')
	                                   .replace(/\s*$/,'');
	 const tpl_ctrl = g('#template_ctrl').innerHTML
	                                   .replace(/^\s*/,'')
	                                   .replace(/\s*$/,'');
	 //output html  replace
	 let out_main = [];
	 let out_ctrl = [];
	 for( i in data){
	 	const _html_main = tpl_main.replace(/{{index}}/g,data[i].img)
	 	                         .replace(/{{h2}}/g,data[i].h2)
	 	                         .replace(/{{h3}}/g,data[i].h3)
	 	                         .replace(/{{css}}/g,['','main-i_right'][i%2]);
        const _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);


        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
	 }

	 g('#template_main').innerHTML = out_main.join('');
	 g('#template_ctrl').innerHTML = out_ctrl.join('');

	 //add #main_background
	 g('#template_main').innerHTML += tpl_main.replace(/{{index}}/g,'{{index}}');
     g('#main_{{index}}').id = 'main_background';
}
//silde click change
function switchSlider(index){
	let main = g('#main_' + index);
	let ctrl = g('#ctrl_' + index);

	//get all silder and ctrl remove css(active)
	const clear_main = g('.main-i');
	const clear_ctrl = g('.ctrl-i');

	for (var i = 0; i < clear_ctrl.length; i++) {
		clear_main[i].className = clear_main[i].className
		                    .replace(/main-i_active/,'');
		clear_ctrl[i].className = clear_ctrl[i].className
		                    .replace(/ctrl-i_active/,'');
	}

	main.className += ' main-i_active';
	ctrl.className += ' ctrl-i_active';
	//change copy background
	setTimeout(function(){
		g('#main_background').innerHTML = main.innerHTML;
	},1000);
}

window.onload = function(){
	addSliders();
	switchSlider(1);
	movePictures();
}



//动态调整图片的margin-top,使其垂直居中
function movePictures() {
	const pictures = g('.picture');
	for(let i = 0; i < pictures.length;i++){
		pictures[i].style.marginTop = (-1*pictures[i].clientHeight/2) + 'px';
	}
}