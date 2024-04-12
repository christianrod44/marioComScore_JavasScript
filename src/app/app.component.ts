import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'Mario Score';
  @ViewChild('pipeLeft', {static: false}) public pipe: any;
  @ViewChild('jumpOff', {static: false}) public jump: any;
  @ViewChild('jumpOff', {static: false}) public mario: any;
  @ViewChild('lv', {static: false}) public lv: any;
  @ViewChild('contHard', {static: false}) public contHard: any;
  pular = false;
  fail=false;
  pipePosition!: any;
  marioPosition!: any;
  cont = 1;
  listRank: any=[];
  apelido:string | null = '';
  timePulo = 500;

  @HostListener('document:keydown', ['$event'])
  onkeydown(event: KeyboardEvent):void {   
    this.pular = true;
    setTimeout(() => {
      this.pular = false;
    },this.timePulo);
  }

  ngAfterViewInit(): void {
    do {
      this.apelido = window.prompt("Digite seu apelido:")
    } while (this.apelido == '');
      this.apelido?.trim();
      if(this.apelido?.trim() != '' && this.apelido != null){
        this.pipe.nativeElement.style.animation.reset;
        this.loop();
      } else {
        window.alert("Coloque um apelido válido.");
        this.gameOver();
      }
  }

  loop(){
    this.pipePosition = this.pipe.nativeElement.offsetLeft;
    this.marioPosition = +window.getComputedStyle(this.mario.nativeElement).bottom.replace('px','');
    console.log(this.pipePosition);
    
    if(this.pipePosition <= 125 && this.pipePosition > 0 && this.marioPosition < 110){
      this.gameOver();
    }

    if(!this.fail){
      this.cont += 1;
      if(this.cont>500){
        this.lv.nativeElement.style.background = 'linear-gradient(#ebe187, #e9ffe0)';
      }
      if(this.cont>1000){
        this.lv.nativeElement.style.background = 'linear-gradient(#eb8787, #ffe0e0)';
      }
      if(this.cont>1500 || this.apelido=="darkmode"){
        this.lv.nativeElement.style.background = '#000000';
        this.contHard.nativeElement.style.color = '#ffffff';
      }
      setTimeout(() => {
        this.loop();
      },10);
    }
  }

  gameOver(){
    this.pipe.nativeElement.style.animation = 'none';
    this.pipe.nativeElement.style.left = `${this.pipePosition}px`;

    this.jump.nativeElement.style.animation = 'none';
    this.jump.nativeElement.style.bottom = `${this.marioPosition}px`;

    this.jump.nativeElement.src = 'assets/game-over.png';
    this.jump.nativeElement.style.width = '75px';
    this.jump.nativeElement.style.marginLeft = '50px';
    this.fail = true;
    this.rank();
  }

  rank(){
    let jogador = `${this.apelido}        ${this.cont} pontos`;
    this.listRank.push(jogador);
    console.log(this.listRank);
    window.alert("Fim da partida.");
    window.alert(this.listRank);
  }

}
