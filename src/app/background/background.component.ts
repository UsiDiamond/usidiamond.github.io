import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  signal,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

import NET from 'vanta/dist/vanta.net.min';
import FOG from 'vanta/dist/vanta.fog.min';

type VantaEffect = {
  destroy: () => void;
};

const THEME = {
  netLine: 0x8d5ba8,
  fogHighlight: 0x4a2670,
  fogMidtone: 0x2a1540,
  fogLowlight: 0x0a0514,
  fogBase: 0x04020a,
};

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
  standalone: false,
})
export class BackgroundComponent {
  @ViewChild('mistBackHost', { static: true })
  private mistBackRef!: ElementRef<HTMLDivElement>;

  @ViewChild('netHost', { static: true })
  private netRef!: ElementRef<HTMLDivElement>;

  @ViewChild('mistFrontHost', { static: true })
  private mistFrontRef!: ElementRef<HTMLDivElement>;

  readonly paused = signal(false);

  private mistBack: VantaEffect | null = null;
  private net: VantaEffect | null = null;
  private mistFront: VantaEffect | null = null;
  private motion?: MediaQueryList;
  private onMotion = () => this.syncState();
  private zone = inject(NgZone);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.motion = matchMedia('(prefers-reduced-motion: reduce)');
      this.motion.addEventListener('change', this.onMotion);
      this.syncState();
    });

    destroyRef.onDestroy(() => {
      this.teardown();
      this.motion?.removeEventListener('change', this.onMotion);
    });
  }

  toggle(): void {
    this.paused.update((v) => !v);
    this.syncState();
  }

  private syncState(): void {
    const shouldRun = !this.paused() && !this.motion?.matches;
    if (shouldRun && !this.net) {
      this.zone.runOutsideAngular(() => this.startEffects());
    } else if (!shouldRun && this.net) {
      this.teardown();
    }
  }

  private startEffects(): void {
    this.mistBack = FOG({
      el: this.mistBackRef.nativeElement,
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: THEME.fogHighlight,
      midtoneColor: THEME.fogMidtone,
      lowlightColor: THEME.fogLowlight,
      baseColor: THEME.fogBase,
      blurFactor: 0.7,
      speed: 0.8,
      zoom: 1.1,
    });

    this.net = NET({
      el: this.netRef.nativeElement,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: THEME.netLine,
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
      points: 11.0,
      maxDistance: 24.0,
      spacing: 17.0,
      showDots: true,
    });

    this.mistFront = FOG({
      el: this.mistFrontRef.nativeElement,
      THREE,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: THEME.fogHighlight,
      midtoneColor: THEME.fogMidtone,
      lowlightColor: 0x000000,
      baseColor: 0x000000,
      blurFactor: 0.9,
      speed: 1.1,
      zoom: 0.6,
    });
  }

  private teardown(): void {
    this.mistBack?.destroy();
    this.net?.destroy();
    this.mistFront?.destroy();
    this.mistBack = null;
    this.net = null;
    this.mistFront = null;
  }
}
