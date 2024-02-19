import { SvgIconComponent } from "@mui/icons-material";

interface ChartProps {
    aspect: number;
    title: string;
  }

interface TitleProps {
    children?: React.ReactNode;
  }

interface StatCardProps {
    Icon: SvgIconComponent
    value: string;
    label: string;
    percentage: string;
  }
  
  

export { type ChartProps, type TitleProps, type StatCardProps };
