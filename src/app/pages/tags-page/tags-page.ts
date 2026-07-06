import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamendoService } from '@core/services/jamendo.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TrackCard } from '@components/track-card/track-card';
import { Track } from '@core/models/jamendo/tracks.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface SearchContext {
  items: Track[];
  total: number;
  offset: number;
  limit: number;
}

const INITIAL_SEARCH: SearchContext = {
  items: [],
  total: 0,
  offset: 0,
  limit: 42,
};

@Component({
  selector: 'hive-tags-page',
  imports: [MatPaginator, TrackCard],
  templateUrl: './tags-page.html',
  styleUrl: './tags-page.scss',
})
export class TagsPage {
  protected readonly INITIAL_SEARCH = INITIAL_SEARCH;
  private readonly route = inject(ActivatedRoute);
  private readonly jamendoService = inject(JamendoService);
  private readonly tracks = signal<SearchContext>(INITIAL_SEARCH);
  readonly query = toSignal(
    this.route.queryParamMap.pipe(
      map((parameter) => {
        return parameter.get('q') ?? '';
      })
    ),
    {
      initialValue: '',
    }
  );
  readonly tracksContext = computed(() => {
    return {
      items: this.tracks().items,
      total: this.tracks().total,
      offset: this.tracks().offset,
      limit: this.tracks().limit,
    };
  });
  readonly isTracksLoading = signal<boolean>(false);

  constructor() {
    effect(() => {
      const query = this.query();
      this.tracks.set(INITIAL_SEARCH);
      if (!query) {
        return;
      } else {
        this.loadData(query);
      }
    });
  }

  private checkTags(tags: string[]): string[] {
    return tags.map((tag) => {
      return tag.includes('&') ? tag.split('&').join('n') : tag;
    });
  }

  private loadSectionData(query: string, offset = INITIAL_SEARCH.offset, limit = INITIAL_SEARCH.limit): void {
    this.isTracksLoading.set(true);
    void this.jamendoService
      .getTracksByTag(this.checkTags([query]), offset, limit)
      .then((response) => {
        this.tracks.set(response);
      })
      .catch(() => {
        this.tracks.set(INITIAL_SEARCH);
      })
      .finally(() => {
        this.isTracksLoading.set(false);
      });
  }

  loadData(query: string): void {
    this.loadSectionData(query);
  }

  isEmpty(): boolean {
    return this.tracks().total === 0;
  }

  paginationEvent(event: PageEvent): void {
    const offset = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.loadSectionData(this.query(), offset, limit);
  }

  calculatePageSizesOptions(total: number): number[] {
    const sizes = [INITIAL_SEARCH.limit, INITIAL_SEARCH.limit * 2, INITIAL_SEARCH.limit * 4, total];
    if (total > INITIAL_SEARCH.limit) {
      return sizes.filter((size) => {
        return size <= total;
      });
    }
    return [total];
  }
}
