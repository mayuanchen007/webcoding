import { Component } from '@angular/core';
const todo :{
  id:number,
  content:string,
  isdo:boolean
}[]=[
  {id:1,content:'洗衣服',isdo:false},
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'todoMVC';
  public todos:{id:number,content:string,isdo:boolean}[]=JSON.parse(window.localStorage.getItem("todos")||'[]');

  public a:{id:any,content:any,isdo:any}={id:1,content:'a',isdo:true};
  public todo:{id:any,content:any,isdo:any}={id:1,content:'a',isdo:true};
  public visible:string='all'
  ngOnInit(){
    this.ons();
    window.onhashchange=this.ons.bind(this);
  }

  ons(){
    switch(window.location.hash.substr(1)){
      case "/" : 
        this.visible='all'; 
        break;
      case "/active" : 
        this.visible='active'; 
        break;
      case "/completed" : 
        this.visible='completed';
        break;
      default:
        break;
    }
  }
  ngDoCheck(){
    window.localStorage.setItem('todos',JSON.stringify( this.todos));
  }
  addItem(e:any):void{
    if(e.keyCode===13){
      if(e.target.value)
      {
        this.todos.push({
          id:this.todos.length?this.todos.length+1:1,
          content:e.target.value,
          isdo:false
        });
        e.target.value=''
      }
       
    }
  }
  get toggleAll(){
    return this.todos.every(t=> t.isdo);
  }

  set toggleAll(val:any){
    console.log(val.target.checked)
      this.todos.forEach(t=> t.isdo=val.target.checked)
  }

  removeItem(index:number){
    this.todos.splice(index,1);
  }
  edit(val:any){
    this.todo=val
  }
  saveTodo(item:any,e:any){
    console.log(e.target.value)
    item.content=e.target.value;
    this.todo=this.a
  }

  get getDoneItems(){
    return this.todos.filter(item=>!item.isdo).length;
  }

  clearCompleted(){
    this.todos=this.todos.filter(item=> !item.isdo);
  }

  get filterTodos(){
    if(this.visible==='all'){
      return this.todos;
    }
    else if(this.visible==='active'){
      return this.todos.filter(tiem=> !tiem.isdo)
    }
    else if(this.visible==='completed'){
      return this.todos.filter(tiem=> tiem.isdo)
    }
    else {
      return [];
    }
  }
}
