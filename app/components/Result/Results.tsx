import React from 'react';
import Body from './body';
import Header from './header';

interface InstructionsProps {
  title: string;
  subtitle: string;
  level: string;
}

export default function Results(props: InstructionsProps) {
  const { title, subtitle, level } = props;
  return (
    <div>
      <Header title={title} subtitle={subtitle} level={level} />
      <Body />
    </div>
  );
}
