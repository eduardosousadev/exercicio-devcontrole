interface ContainerProps {
  children: React.ReactNode;
  as?: React.ElementType;
  tailwindClass?: string;
}

export function Container( { children, as: Tag = 'div', tailwindClass }: ContainerProps) {
  return (
    <Tag className={ `w-full mx-auto max-w-7xl px-2 ${ tailwindClass }` }>
      { children }
    </Tag>
  )
}