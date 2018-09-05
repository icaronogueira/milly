import { NgModule } from '@angular/core';
import { DetalhesUsuarioComponent } from './detalhes-usuario/detalhes-usuario';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [DetalhesUsuarioComponent],
	imports: [CommonModule],
      exports: [DetalhesUsuarioComponent],
      entryComponents: [DetalhesUsuarioComponent]
})
export class ComponentsModule {}
