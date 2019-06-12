import { Component, OnInit } from '@angular/core';
import { Tag } from '../tag';
import { TagService } from '../tag.service';
import { ModalService } from '../../service/modal.service';

@Component({
  selector: 'app-tags-popular',
  templateUrl: './tags-popular.component.html',
  styleUrls: ['./tags-popular.component.scss']
})
export class TagsPopularComponent implements OnInit {
  tags: Tag[];

  constructor(
    private tagService: TagService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.getTagsPopular();
  }

  getTagsPopular(): void {
    this.tagService.getTags().subscribe((response) => {
      const tags = response['data'];
      this.tags = tags;
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

}
