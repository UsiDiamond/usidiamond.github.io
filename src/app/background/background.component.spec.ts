import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundComponent } from './background.component';

/** Prevents Vanta/THREE from starting by reporting prefers-reduced-motion: reduce. */
function mockMatchMediaReducedMotion(): void {
  spyOn(window, 'matchMedia').and.returnValue({
    matches: true,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: jasmine.createSpy('addEventListener'),
    removeEventListener: jasmine.createSpy('removeEventListener'),
    addListener: jasmine.createSpy('addListener'),
    removeListener: jasmine.createSpy('removeListener'),
    onchange: null,
    dispatchEvent: jasmine.createSpy('dispatchEvent').and.returnValue(false),
  } as unknown as MediaQueryList);
}

describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;

  beforeEach(async () => {
    mockMatchMediaReducedMotion();
    await TestBed.configureTestingModule({
      imports: [BackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('paused signal should start as false', () => {
    expect(component.paused()).toBe(false);
  });

  it('toggle() should set paused to true', () => {
    component.toggle();
    expect(component.paused()).toBe(true);
  });

  it('toggle() called twice should return paused to false', () => {
    component.toggle();
    component.toggle();
    expect(component.paused()).toBe(false);
  });

  it('toggle() should flip the paused value on each call', () => {
    expect(component.paused()).toBe(false);
    component.toggle();
    expect(component.paused()).toBe(true);
    component.toggle();
    expect(component.paused()).toBe(false);
    component.toggle();
    expect(component.paused()).toBe(true);
  });

  it('should render exactly three vanta host divs', () => {
    const el: HTMLElement = fixture.nativeElement;
    const hosts = el.querySelectorAll('.vanta-host');
    expect(hosts.length).toBe(3);
  });

  it('should render the mist-back host div', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.vanta-mist-back')).toBeTruthy();
  });

  it('should render the net host div', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.vanta-net')).toBeTruthy();
  });

  it('should render the mist-front host div', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.vanta-mist-front')).toBeTruthy();
  });

  it('all vanta host divs should carry aria-hidden="true"', () => {
    const el: HTMLElement = fixture.nativeElement;
    const hosts = el.querySelectorAll('.vanta-host');
    expect(hosts.length).toBeGreaterThan(0);
    hosts.forEach((host) => {
      expect(host.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
