import type { Border, Color, Font, Margin, Palette } from 'themes/interfaces';

export interface Theme {
  id: number;
  font: Font;
  color: Color;
  margin: Margin;
  border: Border;
  palette: Palette;
}
