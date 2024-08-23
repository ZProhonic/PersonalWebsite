import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class PortfolioComponent implements AfterViewInit {

  currentIndex: number = 0;
  totalItems: number = 6; // Total number of portfolio items
  itemsPerPage: number = 2; // Number of items visible per page
  itemWidth: number = 0; // Width of each carousel item

  ngAfterViewInit() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const portfolioCarousel = document.querySelector('.project-portfolio-carousel') as HTMLElement;
    const portfolioItems = portfolioCarousel.children; // Get the portfolio items

    if (portfolioItems.length > 0) {
      this.itemWidth = portfolioItems[0].clientWidth; // Get the width of a single portfolio item
    }

    prevBtn?.addEventListener('click', () => this.scrollCarousel(-1, portfolioCarousel));
    nextBtn?.addEventListener('click', () => this.scrollCarousel(1, portfolioCarousel));
  }

  scrollCarousel(direction: number, container: HTMLElement) {
    const maxIndex = Math.ceil(this.totalItems / this.itemsPerPage) - 1;

    this.currentIndex += direction;
    if (this.currentIndex < 0) {
      this.currentIndex = maxIndex;
    } else if (this.currentIndex > maxIndex) {
      this.currentIndex = 0;
    }

    // Correct offset calculation
    const offset = -this.currentIndex * this.itemWidth * this.itemsPerPage;
    container.style.transform = `translateX(${offset}px)`;
  }
}
