import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar.component';
import { Footer } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProdutosComponent } from './components/produtos/produtos.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, HeroComponent, ProdutosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'meu-projeto';
}
