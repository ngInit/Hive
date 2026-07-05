import { ShowPassword } from './show-password.directive';

describe('ShowPassword directive', () => {
  let directive: ShowPassword;

  beforeEach(() => {
    directive = new ShowPassword();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('Should start in hidden state', () => {
    expect(directive.visible).toBe(false);
  });

  describe('Toggle visibility', () => {
    it.each([
      {
        title: 'Toggle one time',
        action: (directive: ShowPassword) => {
          directive.toggle();
        },
        expected: true,
      },
      {
        title: 'Toggle two times',
        action: (directive: ShowPassword) => {
          directive.toggle();
          directive.toggle();
        },
        expected: false,
      },
    ])('$title', ({ action, expected }) => {
      action(directive);
      expect(directive.visible).toBe(expected);
    });
  });

  describe('Call reset', () => {
    it('Should be hidden', () => {
      directive.toggle();
      directive.reset();
      expect(directive.visible).toBe(false);
    });

    it('Should be still hidden', () => {
      directive.reset();
      expect(directive.visible).toBe(false);
    });
  });
});
