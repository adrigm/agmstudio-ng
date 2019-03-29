import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CockpitService } from 'src/app/services/cockpit.service';

declare var Prism;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, AfterViewInit {
  posts: any;

  constructor(
    private cockpit: CockpitService
  ) { }

  ngOnInit() {
    this.cockpit.getAllPosts()
    .subscribe( posts => {
      this.posts = posts;
    });

  }

  ngAfterViewInit() {
    // const block = document.getElementById('code');
    // console.log(block);
    // Prism.highlightElement(block);

  }

}
