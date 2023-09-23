(()=>{"use strict";class e{constructor(e,t,n,r){this.templateEl=document.getElementById(e),this.hostEl=document.getElementById(t);const s=document.importNode(this.templateEl.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostEl.insertAdjacentElement(e,this.element)}}var t,n;function r(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLen&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minLen),null!=e.maxLen&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLen),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),t}!function(e){e[e.NotEmpty=0]="NotEmpty",e[e.PostiveNum=1]="PostiveNum"}(t||(t={})),function(e){e.ACTIVE="active",e.FINISHED="finished"}(n||(n={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class i{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}const l=class extends i{constructor(){super(),this.projects=[]}static getInstance(){return this.instance?this.instance:new this}addProject(e,t,r){const i=new s(Math.random().toString(),e,t,r,n.ACTIVE);this.projects.push(i),this.triggerListeners()}triggerListeners(){for(const e of this.listeners)e(this.projects.slice())}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!=t&&(n.status=t,this.triggerListeners())}}.getInstance();function o(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}class a extends e{constructor(){super("project-input","app","afterbegin","user-input"),this.titleInputEl=this.element.querySelector("#title"),this.descriptionInputEl=this.element.querySelector("#description"),this.peopleInputEl=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}validateInputs(e,t,n){const s={value:t,required:!0,minLen:5},i={value:n,required:!0,min:1};return r({value:e,required:!0})&&r(s)&&r(i)}gatherUserInput(){const e=this.titleInputEl.value,t=this.descriptionInputEl.value,n=this.peopleInputEl.value;if(this.validateInputs(e,t,n))return[e,t,+n];alert("Invalid input, please try again!")}clearInputs(){this.titleInputEl.value="",this.peopleInputEl.value="",this.descriptionInputEl.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(this.clearInputs(),3===(null==t?void 0:t.length)){const[e,n,r]=t;l.addProject(e,n,r)}}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([o],a.prototype,"submitHandler",null);var c=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class d extends e{get persons(){return 1===this.project.people?"1 person":`${this.project.people} people`}constructor(e,t){super("single-project",e,"beforeend",t.id),this.project=t,this.configure(),this.renderContent()}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.persons+" assigned",this.element.querySelector("p").textContent=this.project.description}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("DragEnd")}}c([o],d.prototype,"dragStartHandler",null),c([o],d.prototype,"dragEndHandler",null);var p=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class u extends e{constructor(e){super("project-list","app","beforeend",`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}renderProjects(){document.getElementById(`${this.type}-projects-list`).innerHTML="";for(const e of this.assignedProjects)new d(this.element.querySelector("ul").id,e)}renderContent(){const e=`${this.type}-projects-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.type.toUpperCase()+" PROJECTS"}configure(){l.addListener((e=>{const t=e.filter((e=>this.type===e.status));this.assignedProjects=t,this.renderProjects()})),this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler)}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}dropHandler(e){const t=e.dataTransfer.getData("text/plain");l.moveProject(t,this.type),this.element.querySelector("ul").classList.remove("droppable")}}p([o],u.prototype,"dragOverHandler",null),p([o],u.prototype,"dragLeaveHandler",null),p([o],u.prototype,"dropHandler",null),new a,new u(n.ACTIVE),new u(n.FINISHED)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0NBVUQsR0FEQ0EsRyxxQ0FPRCxHQURDQSxHLGdDQ2hFSCxJQUFJUSxFQUNKLElBQUlrQyxFQUFZcEYsRUFBY2lDLFFBQzlCLElBQUltRCxFQUFZcEYsRUFBY3VHLFMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0X3RlbXBsYXRlLy4vc3JjL2NvbXBvbmVudHMvYmFzZS50cyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RlbXBsYXRlLy4vc3JjL3V0aWxzL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90ZW1wbGF0ZS8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RlbXBsYXRlLy4vc3JjL3N0YXRlL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90ZW1wbGF0ZS8uL3NyYy9kZWNvcmF0b3JzL2JpbmQudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90ZW1wbGF0ZS8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90ZW1wbGF0ZS8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RlbXBsYXRlLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL3Byb2plY3RfdGVtcGxhdGUvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvbXBvbmVudCBCYXNlIENsYXNzXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XG4gIHRlbXBsYXRlRWw6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gIGhvc3RFbDogVDtcbiAgZWxlbWVudDogVTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsXG4gICAgaG9zdEVsZW1lbnRJZDogc3RyaW5nLFxuICAgIGluc2VydExvYzogSW5zZXJ0UG9zaXRpb24sXG4gICAgbmV3RWxlbWVudElkPzogc3RyaW5nXG4gICkge1xuICAgIHRoaXMudGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGVtcGxhdGVJZFxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5ob3N0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSBhcyBUO1xuXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWwuY29udGVudCwgdHJ1ZSk7XG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XG4gICAgaWYgKG5ld0VsZW1lbnRJZCkge1xuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xuICAgIH1cbiAgICB0aGlzLmF0dGFjaChpbnNlcnRMb2MpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2goaW5zZXJ0TG9jOiBJbnNlcnRQb3NpdGlvbikge1xuICAgIHRoaXMuaG9zdEVsLmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRMb2MsIHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcbiAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xufVxuIiwiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gVGhpcyBpcyBteSBpbml0aWFsIGF0dGVtcHQgYXQgdmFsaWRhdGlvbi5cbi8vIFRoZSBpZGVhIGlzIHRoYXQgd2UgY291bGQgZGVmaW5lIGRpZmZlcmVudCB0eXBlcyBvZiB2YWxpZGF0aW9ucyBpbiB0aGUgZW51bSwgYW5kXG4vLyB0aGUgVmFsaWRhdG9yIHdvdWxkIHRha2UgYW4gb2JqZWN0IHdpdGggdGhlIHZhbHVlIHRvIHZhbGlkYXRlIGFzIHRoZSBrZXkgYW5kIGEgbGlzdFxuLy8gb2YgcHJlZGVmaW5lZCB2YWxpZGF0aW9ucyB2aWEgb3VyIGVudW0uIEl0IHdvdWxkIHRoZW4gbG9vcCBvdmVyIHRoZW0gYW5kIHJ1biB0aGUgY2hlY2tzIHdlXG4vLyBzcGVjaWZpZWQuXG4vLyBFeGFtcGxlOlxuLy8gY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcih7XCJNeSB2YWx1ZSB0byB2YWxpZGF0ZVwiOiBbVmFsaWRhdGlvbnMuTm90RW1wdHksIFZhbGlkYXRpb25zLk5vU3dlYXJXb3Jkc119KVxuLy8gY29uc3QgdmFsaWRhdGlvbl9yZXN1bHQgPSB2YWxpZGF0b3IudmFsaWRhdGUoKTtcbmVudW0gVmFsaWRhdGlvbnMge1xuICBOb3RFbXB0eSxcbiAgUG9zdGl2ZU51bSxcbn1cblxuY2xhc3MgVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2YWxpZGF0ZWVzOiB7IFtrZXk6IHN0cmluZyB8IG51bWJlcl06IFZhbGlkYXRpb25zW10gfSkge31cbiAgcHVibGljIHZhbGlkYXRlKCk6IGJvb2xlYW4ge1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgICBmb3IgKGNvbnN0IHZhbGlkYXRlX21lIGluIHRoaXMudmFsaWRhdGVlcykge1xuICAgICAgZm9yIChjb25zdCB2YWxpZHMgaW4gdGhpcy52YWxpZGF0ZWVzW3ZhbGlkYXRlX21lXSkge1xuICAgICAgICBzd2l0Y2ggKCt2YWxpZHMpIHtcbiAgICAgICAgICBjYXNlIFZhbGlkYXRpb25zLk5vdEVtcHR5OlxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlX21lLnRyaW0oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBWYWxpZGF0aW9ucy5Qb3N0aXZlTnVtOlxuICAgICAgICAgICAgaWYgKCt2YWxpZGF0ZV9tZSA8PSAwKSB7XG4gICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc1ZhbGlkO1xuICB9XG59XG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBUaGlzIGlzIHRoZSBpbnN0cnVjdG9yJ3MgbWV0aG9kIG9mIGltcGxlbWVudGluZyB2YWxpZGF0aW9uXG4vLyBJIHRoaW5rIGhlIHBsYW5zIHRvIGNyZWF0ZSBhIG5ldyB0eXBlIHRoYXQgaGUgd2lsbCBwYXNzIGludG8gYSBmdW5jdGlvblxuLy8gdGhhdCB3aWxsIHJ1biB0aGUgcmVsZXZhbnQgY2hlY2tzIGlmIHRoZXkgZXhpc3QgaW4gdGhlIGlucHV0IG9iamVjdC5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIG1pbkxlbj86IG51bWJlcjtcbiAgbWF4TGVuPzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKTogYm9vbGVhbiB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW5MZW4gIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXG4gICkge1xuICAgIGlzVmFsaWQgPVxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbjtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW4gIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXG4gICkge1xuICAgIGlzVmFsaWQgPVxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbjtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcIm51bWJlclwiXG4gICkge1xuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGFibGVJbnB1dC5taW47XG4gIH1cbiAgaWYgKFxuICAgIHZhbGlkYXRhYmxlSW5wdXQubWF4ICE9IG51bGwgJiZcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIlxuICApIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4O1xuICB9XG4gIHJldHVybiBpc1ZhbGlkO1xufVxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG4gIEFDVElWRSA9IFwiYWN0aXZlXCIsXG4gIEZJTklTSEVEID0gXCJmaW5pc2hlZFwiLFxufVxuLy8gUHJvamVjdCBUeXBlXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXG4gICkge31cbn1cbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcblxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xuXG5jbGFzcyBTdGF0ZTxUPiB7XG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcblxuICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZ1bmM6IExpc3RlbmVyPFQ+KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZ1bmMpO1xuICB9XG59XG5cbi8vIFByb2plY3QgU3RhdGUgTWFuYWdlbWVudFxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGU7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyB0aGlzKCk7XG4gIH1cblxuICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2M6IHN0cmluZywgcGVvcGxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2MsXG4gICAgICBwZW9wbGUsXG4gICAgICBQcm9qZWN0U3RhdHVzLkFDVElWRVxuICAgICk7XG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIHRoaXMudHJpZ2dlckxpc3RlbmVycygpO1xuICB9XG5cbiAgdHJpZ2dlckxpc3RlbmVycygpIHtcbiAgICAvLyBFeGVjdXRlIGV2ZXJ5IGxpc3RlbmVyIGZ1bmN0aW9uIHdoZW5ldmVyIGEgcHJvamVjdCBpcyBhZGRlZFxuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGdW5jIG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lckZ1bmModGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG4gICAgY29uc3QgdGFyZ2V0UHJvaiA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvaikgPT4gcHJvai5pZCA9PT0gcHJvamVjdElkKTtcbiAgICBpZiAodGFyZ2V0UHJvaiAmJiB0YXJnZXRQcm9qLnN0YXR1cyAhPSBuZXdTdGF0dXMpIHtcbiAgICAgIHRhcmdldFByb2ouc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgdGhpcy50cmlnZ2VyTGlzdGVuZXJzKCk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgY29uc3Qgc3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBCaW5kVG9DbGFzcyhcbiAgcHJvdG90eXBlOiBhbnksXG4gIGZ1bmNOYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxuKSB7XG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICAgIHJldHVybiBib3VuZEZuO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZVwiO1xuaW1wb3J0IHsgVmFsaWRhdGFibGUsIHZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRpb25cIjtcbmltcG9ydCB7IHN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3RcIjtcbmltcG9ydCB7IEJpbmRUb0NsYXNzIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYmluZFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+IHtcbiAgdGl0bGVJbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuICBkZXNjcmlwdGlvbklucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHBlb3BsZUlucHV0RWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJwcm9qZWN0LWlucHV0XCIsIFwiYXBwXCIsIFwiYWZ0ZXJiZWdpblwiLCBcInVzZXItaW5wdXRcIik7XG4gICAgdGhpcy50aXRsZUlucHV0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI3RpdGxlXCJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiI2Rlc2NyaXB0aW9uXCJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIiNwZW9wbGVcIlxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICB9XG5cbiAgY29uZmlndXJlKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge31cblxuICBwcml2YXRlIHZhbGlkYXRlSW5wdXRzKHRpdGxlOiBzdHJpbmcsIGRlc2M6IHN0cmluZywgcGVvcGxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvLyBUaGlzIHdhcyB0aGUgaW1wbGVtZW50YXRpb24gZm9yIG15IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBjb25zdCB2YWxpZGF0aW9uX29iaiA9IHtcbiAgICAvLyAgIFt0aXRsZV06IFtWYWxpZGF0aW9ucy5Ob3RFbXB0eV0sXG4gICAgLy8gICBbZGVzY106IFtWYWxpZGF0aW9ucy5Ob3RFbXB0eV0sXG4gICAgLy8gICBbcGVvcGxlXTogW1ZhbGlkYXRpb25zLk5vdEVtcHR5LCBWYWxpZGF0aW9ucy5Qb3N0aXZlTnVtXSxcbiAgICAvLyB9O1xuICAgIC8vIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IodmFsaWRhdGlvbl9vYmopO1xuICAgIC8vIHJldHVybiB2YWxpZGF0b3IudmFsaWRhdGUoKTtcblxuICAgIC8vIEJlbG93IGlzIHRoZSBpbXBsZW1lbmF0aW9uIGxvZ2ljIGZvciB0aGUgaW5zdHJ1Y3RvcnMgdmFsaWRhdGlvbiBsb2dpY1xuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6IHRpdGxlLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfTtcbiAgICBjb25zdCBkZXNjVmFsaWRhdGFibGU6IFZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6IGRlc2MsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbkxlbjogNSxcbiAgICB9O1xuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRhYmxlOiBWYWxpZGF0YWJsZSA9IHtcbiAgICAgIHZhbHVlOiBwZW9wbGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbjogMSxcbiAgICB9O1xuICAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKSAmJlxuICAgICAgdmFsaWRhdGUoZGVzY1ZhbGlkYXRhYmxlKSAmJlxuICAgICAgdmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB8IHZvaWQge1xuICAgIGNvbnN0IGVudGVyZWRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsLnZhbHVlO1xuICAgIGNvbnN0IGVudGVyZWREZXNjID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWwudmFsdWU7XG4gICAgY29uc3QgZW50ZXJlZFBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbC52YWx1ZTtcblxuICAgIGlmICghdGhpcy52YWxpZGF0ZUlucHV0cyhlbnRlcmVkVGl0bGUsIGVudGVyZWREZXNjLCBlbnRlcmVkUGVvcGxlKSkge1xuICAgICAgYWxlcnQoXCJJbnZhbGlkIGlucHV0LCBwbGVhc2UgdHJ5IGFnYWluIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2MsICtlbnRlcmVkUGVvcGxlXTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJJbnB1dHMoKSB7XG4gICAgdGhpcy50aXRsZUlucHV0RWwudmFsdWUgPSBcIlwiO1xuICAgIHRoaXMucGVvcGxlSW5wdXRFbC52YWx1ZSA9IFwiXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWwudmFsdWUgPSBcIlwiO1xuICB9XG5cbiAgQEJpbmRUb0NsYXNzXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XG4gICAgdGhpcy5jbGVhcklucHV0cygpO1xuICAgIGlmICh1c2VySW5wdXQ/Lmxlbmd0aCA9PT0gMykge1xuICAgICAgY29uc3QgW3RpdGxlLCBkZXNjLCBwZW9wbGVdID0gdXNlcklucHV0O1xuICAgICAgc3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFByb2plY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wXCI7XG5pbXBvcnQgeyBCaW5kVG9DbGFzcyB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2JpbmRcIjtcbi8vIFByb2plY3RJdGVtIENsYXNzXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cbiAgaW1wbGVtZW50cyBEcmFnZ2FibGVcbntcbiAgcHJvamVjdDogUHJvamVjdDtcblxuICBnZXQgcGVyc29ucygpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIFwiMSBwZXJzb25cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlb3BsZWA7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBzdXBlcihcInNpbmdsZS1wcm9qZWN0XCIsIGhvc3RJZCwgXCJiZWZvcmVlbmRcIiwgcHJvamVjdC5pZCk7XG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgY29uZmlndXJlKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgzXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucyArIFwiIGFzc2lnbmVkXCI7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIEBCaW5kVG9DbGFzc1xuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIHRoaXMucHJvamVjdC5pZCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gIH1cblxuICBAQmluZFRvQ2xhc3NcbiAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJEcmFnRW5kXCIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSBcIi4vcHJvamVjdC1pdGVtXCI7XG5pbXBvcnQgeyBzdGF0ZSB9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0XCI7XG5pbXBvcnQgeyBCaW5kVG9DbGFzcyB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2JpbmRcIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0XG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XG57XG4gIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFByb2plY3RTdGF0dXMpIHtcbiAgICBzdXBlcihcInByb2plY3QtbGlzdFwiLCBcImFwcFwiLCBcImJlZm9yZWVuZFwiLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlclByb2plY3RzKCkge1xuICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxuICAgICkgYXMgSFRNTFVMaXN0RWxlbWVudDtcblxuICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgcHJvakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XG4gICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQsIHByb2pJdGVtKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQgPSBsaXN0SWQ7XG5cbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9XG4gICAgICB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSArIFwiIFBST0pFQ1RTXCI7XG4gIH1cblxuICBjb25maWd1cmUoKSB7XG4gICAgc3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoXG4gICAgICAgIChwcm9qKSA9PiB0aGlzLnR5cGUgPT09IHByb2ouc3RhdHVzXG4gICAgICApO1xuICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xuICB9XG5cbiAgQEJpbmRUb0NsYXNzXG4gIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09IFwidGV4dC9wbGFpblwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZChcImRyb3BwYWJsZVwiKTtcbiAgICB9XG4gIH1cblxuICBAQmluZFRvQ2xhc3NcbiAgZHJhZ0xlYXZlSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpITtcbiAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZShcImRyb3BwYWJsZVwiKTtcbiAgfVxuXG4gIEBCaW5kVG9DbGFzc1xuICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgcHJvaklkID0gZXZlbnQuZGF0YVRyYW5zZmVyIS5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcbiAgICBzdGF0ZS5tb3ZlUHJvamVjdChwcm9qSWQsIHRoaXMudHlwZSk7XG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wcGFibGVcIik7XG4gIH1cbn1cbiIsImltcG9ydCB7IFByb2plY3RJbnB1dCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dFwiO1xuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdFwiO1xuaW1wb3J0IHsgUHJvamVjdFN0YXR1cyB9IGZyb20gXCIuL21vZGVscy9wcm9qZWN0XCI7XG5cbm5ldyBQcm9qZWN0SW5wdXQoKTtcbm5ldyBQcm9qZWN0TGlzdChQcm9qZWN0U3RhdHVzLkFDVElWRSk7XG5uZXcgUHJvamVjdExpc3QoUHJvamVjdFN0YXR1cy5GSU5JU0hFRCk7XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJ0ZW1wbGF0ZUlkIiwiaG9zdEVsZW1lbnRJZCIsImluc2VydExvYyIsIm5ld0VsZW1lbnRJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhvc3RFbCIsImltcG9ydGVkTm9kZSIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiZWxlbWVudCIsImZpcnN0RWxlbWVudENoaWxkIiwiaWQiLCJhdHRhY2giLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJWYWxpZGF0aW9ucyIsIlByb2plY3RTdGF0dXMiLCJ2YWxpZGF0ZSIsInZhbGlkYXRhYmxlSW5wdXQiLCJpc1ZhbGlkIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsIm1pbkxlbiIsIm1heExlbiIsIm1pbiIsIm1heCIsIlByb2plY3QiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicGVvcGxlIiwic3RhdHVzIiwiU3RhdGUiLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyRnVuYyIsInB1c2giLCJzdGF0ZSIsInN1cGVyIiwicHJvamVjdHMiLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiYWRkUHJvamVjdCIsImRlc2MiLCJuZXdQcm9qZWN0IiwiTWF0aCIsInJhbmRvbSIsIkFDVElWRSIsInRyaWdnZXJMaXN0ZW5lcnMiLCJzbGljZSIsIm1vdmVQcm9qZWN0IiwicHJvamVjdElkIiwibmV3U3RhdHVzIiwidGFyZ2V0UHJvaiIsImZpbmQiLCJwcm9qIiwiQmluZFRvQ2xhc3MiLCJwcm90b3R5cGUiLCJmdW5jTmFtZSIsImRlc2NyaXB0b3IiLCJvcmlnaW5hbE1ldGhvZCIsImNvbmZpZ3VyYWJsZSIsImdldCIsImJpbmQiLCJQcm9qZWN0SW5wdXQiLCJ0aXRsZUlucHV0RWwiLCJxdWVyeVNlbGVjdG9yIiwiZGVzY3JpcHRpb25JbnB1dEVsIiwicGVvcGxlSW5wdXRFbCIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwicmVuZGVyQ29udGVudCIsInZhbGlkYXRlSW5wdXRzIiwiZGVzY1ZhbGlkYXRhYmxlIiwicGVvcGxlVmFsaWRhdGFibGUiLCJnYXRoZXJVc2VySW5wdXQiLCJlbnRlcmVkVGl0bGUiLCJlbnRlcmVkRGVzYyIsImVudGVyZWRQZW9wbGUiLCJhbGVydCIsImNsZWFySW5wdXRzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJJbnB1dCIsIlByb2plY3RJdGVtIiwicGVyc29ucyIsInByb2plY3QiLCJob3N0SWQiLCJkcmFnU3RhcnRIYW5kbGVyIiwiZHJhZ0VuZEhhbmRsZXIiLCJ0ZXh0Q29udGVudCIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJlZmZlY3RBbGxvd2VkIiwiXyIsImNvbnNvbGUiLCJsb2ciLCJQcm9qZWN0TGlzdCIsInR5cGUiLCJhc3NpZ25lZFByb2plY3RzIiwicmVuZGVyUHJvamVjdHMiLCJpbm5lckhUTUwiLCJwcm9qSXRlbSIsImxpc3RJZCIsInRvVXBwZXJDYXNlIiwicmVsZXZhbnRQcm9qZWN0cyIsImZpbHRlciIsImRyYWdPdmVySGFuZGxlciIsImRyYWdMZWF2ZUhhbmRsZXIiLCJkcm9wSGFuZGxlciIsInR5cGVzIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwicHJvaklkIiwiZ2V0RGF0YSIsIkZJTklTSEVEIl0sInNvdXJjZVJvb3QiOiIifQ==