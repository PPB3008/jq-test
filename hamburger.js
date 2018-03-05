(function($){
	$.fn.extend({
		burger:function(docClass,aText){
			burger={
				docClass:"",
				aText:"",
				doc:{},
				state:false,
				ulHeight:0,
				getOption:function(docClass,aText){
					this.docClass=docClass;
					this.aText=aText;
					return this.judge();
				},
				judge:function(){
					if(document.querySelector(this.docClass)){
					this.doc=document.querySelector(this.docClass);
						for(let x in this.doc.childNodes){
							if(this.doc.childNodes[x].nodeName=="UL"){
								return this.add();
							}
						}
					}
				},
				add:function(){
					let aDoc=document.createElement("a");
					let ulDoc=document.querySelector("."+this.doc.className+" ul");
					aDoc.innerHTML=this.aText;
					this.doc.insertBefore(aDoc,ulDoc);
					return this.render(ulDoc,aDoc);
				},
				render:function(ulDoc,aDoc){
					let liDoc=document.querySelectorAll("."+this.doc.className+" li");
					this.doc.className+=" burger-container";
					for(let y in liDoc){
						if(liDoc[y].nodeName=="LI"){
						this.ulHeight+=liDoc[y].offsetHeight;
						}
					}
					return this.addActive(ulDoc,aDoc);
				},
				addActive:function(ulDoc,aDoc){
					let ulClass=ulDoc.className;
					let overlay=document.querySelector(".overlay");
					aDoc.addEventListener("click",()=>{
						if(this.state){
							document.querySelector(".overlay").className="overlay";
							ulDoc.className=ulClass;
							ulDoc.style.height=0;
							this.state=false;
						}
						else{
							document.querySelector(".overlay").className="overlay overlay-active";
							ulDoc.className=ulClass+" active";
							ulDoc.style.height=burger.ulHeight+"px";
							this.state=true;
						}
					})
					overlay.addEventListener("click",()=>{
						document.querySelector(".overlay").className="overlay";
						ulDoc.className="";
						ulDoc.style.height=0;
						this.state=false;
					})
				}
			};
			burger.getOption(docClass,aText);
			return this;
		}
	});
})(jQuery)
