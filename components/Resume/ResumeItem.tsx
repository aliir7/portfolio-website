"use client";

import { ResumeItemType } from "@/types";

type Props = {
  item: ResumeItemType;
};

const ResumeItem = ({ item }: Props) => {
  return <div>{item.title}</div>;
};

export default ResumeItem;
