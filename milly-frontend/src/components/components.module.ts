import { NgModule } from '@angular/core';
import { DetalhesUsuarioComponent } from './detalhes-usuario/detalhes-usuario';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
	declarations: [DetalhesUsuarioComponent],
	imports: [CommonModule, BrowserModule],
      exports: [DetalhesUsuarioComponent],
      entryComponents: [DetalhesUsuarioComponent]
})
export class ComponentsModule {}
