import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class Details {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     
  }

  comments=[
    {name:'Matt Doman',img:'assets/img/006.png',text:'more'},
    {name:'Mical Matta',img:'assets/img/007.png',text:'more'},
  ] 



  // go to another page
goTo(page){
  this.navCtrl.push(page);
  } 
  
  
readMore(item){
  if(item.text!='more'){
    item.text='more';
  
    }
  else{
    item.text='less';
  }
  }
add=false; 
addComment(){
  if(this.add!=true){
    this.add=true;
  }
  else{
    this.add=false;
  }
}

clicked:string='no';

clickBtn(value){ 
  if (this.clicked==value){
    this.clicked='no';
    }
  else{
      this.clicked=value;
      }
  }
  
  liked:boolean=false;
  clickLike(){
    if(this.liked!=true){
      this.liked=true;
    }
    else{
      this.liked=false;
    }
  }


 
}
