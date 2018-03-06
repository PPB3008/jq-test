(function($){
	$.fn.extend({
		burger:function(aText){
			burger={
				aText:"",
				doc:{},
				state:false,
				ulHeight:0,
				getOption:function(doc,aText){
					this.doc=doc;
					this.aText=aText;
					return this.judge();
				},
				judge:function(){
					if(this.doc){
						for(let x in this.doc.childNodes){
							if(this.doc.childNodes[x].nodeName=="UL"){
								return this.add();
							}
						}
					}
					else{
						console.log("new error");
						return
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
					let top=this.ulTop(ulDoc);
					this.doc.className+=" burger-container";
					for(let y in liDoc){
						if(liDoc[y].nodeName=="LI"){
						this.ulHeight+=liDoc[y].offsetHeight;
						}
					}	
					window.onresize=()=>{
						this.state && this.overlayJudege(top,ulDoc);
						
					}
					return this.addActive(top,ulDoc,aDoc);
				},
				addActive:function(top,ulDoc,aDoc){
					let ulClass=ulDoc.className;
					let overlay=document.querySelector(".overlay");
					aDoc.addEventListener("click",()=>{
						document.querySelector("body").className="";
						if(this.state){
							document.querySelector(".overlay").className="overlay";
							ulDoc.className=ulClass;
							ulDoc.style.height=0;
							ulDoc.style.overlay=""
							this.state=false;
						}
						else{
							document.querySelector(".overlay").className="overlay overlay-active";
							document.querySelector("body").className+="body-overlay";
							ulDoc.className=ulClass+" active";

							this.overlayJudege(top,ulDoc);
							this.state=true;
						}
					})
					overlay.addEventListener("click",()=>{
						document.querySelector(".overlay").className="overlay";
						ulDoc.className="";
						ulDoc.style.height=0;
						this.state=false;
					})
				},
				ulTop:function(ulDoc){
					let top=ulDoc.offsetTop;
					let parent=ulDoc.offsetParent;
					while(parent!=null){
						top+=parent.offsetTop;
						parent=parent.offsetParent;
					}
					return top;
				},
				overlayJudege:function(top,ulDoc){
					if(window.innerHeight-top-this.ulHeight<0){
						ulDoc.style.overflowY="scroll";
						ulDoc.style.height=window.innerHeight-top+"px";
					}
					else{
						ulDoc.style.overflowY="";
						ulDoc.style.height=this.ulHeight+"px";
					}
				}
			};
			burger.getOption(this.get(0),aText);
			return this;
		}
	});
})(jQuery)
