import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkleTextDirective } from './sparkle-text.directive';

@Component({
  template: '<h1 sparkle>Hello World</h1>',
  imports: [SparkleTextDirective],
})
class TestHostComponent {}

@Component({
  template: '<span sparkle></span>',
  imports: [SparkleTextDirective],
})
class EmptyTextHostComponent {}

@Component({
  template: '<p sparkle>Line one<br>Line two</p>',
  imports: [SparkleTextDirective],
})
class MultiLineHostComponent {}

describe('SparkleTextDirective', () => {
  it('should compile and create when applied to a text element', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    const fixture: ComponentFixture<TestHostComponent> =
      TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should not alter the visible text content of the host element', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Hello World');
  });

  it('should not throw when applied to an element with no text content', async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTextHostComponent],
    }).compileComponents();
    expect(() => {
      const fixture = TestBed.createComponent(EmptyTextHostComponent);
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should not throw when the host element contains multiple lines', async () => {
    await TestBed.configureTestingModule({
      imports: [MultiLineHostComponent],
    }).compileComponents();
    expect(() => {
      const fixture = TestBed.createComponent(MultiLineHostComponent);
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should not throw when the component is destroyed', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    expect(() => fixture.destroy()).not.toThrow();
  });
});
