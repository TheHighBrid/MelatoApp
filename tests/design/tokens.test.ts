import { colors, layout, motion, typography } from '@/src/design/tokens';

describe('Melato visual tokens', () => {
  it('defines the restrained near-black and bone foundation', () => {
    expect(colors.ink).toBe('#080808');
    expect(colors.bone).toBe('#F5F1E8');
    expect(colors.accent).toBe('#C9974A');
  });

  it('keeps interface geometry square and motion controlled', () => {
    expect(layout.radius.none).toBe(0);
    expect(layout.radius.subtle).toBeLessThanOrEqual(4);
    expect(motion.standardMs).toBeGreaterThanOrEqual(180);
    expect(motion.standardMs).toBeLessThanOrEqual(280);
  });

  it('separates expressive display type from calm interface type', () => {
    expect(typography.display.family).not.toEqual(typography.ui.family);
    expect(typography.meta.letterSpacing).toBeGreaterThan(0);
  });
});
