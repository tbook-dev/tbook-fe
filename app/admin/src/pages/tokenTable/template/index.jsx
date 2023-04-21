import { useRequest } from "ahooks";
import { useState } from "react";
import Card from "./card";
import Select from "@/components/select/themeSelect";
import { getTemplate, getTags } from "@/api/incentive";

export default function Template({
  title = "Tokentable Templates",
  paragraph = "Discover innovative token table solutions by studying successful projects",
}) {
  const [cateGory, setCateGory] = useState([]);
  const { data: templateList = [] } = useRequest(() => getTemplate(cateGory), { refreshDeps: [cateGory] });
  const { data: tagList = [] } = useRequest(getTags);

  return (
    <div className="mb-10 dark:text-white">
      <div className="mb-4 text-center">
        <h2 className="font-bold lg:mb-1 text-ch1 lg:text-cwh1">{title}</h2>
        <p className="mb-2 text-c15 lg:text-c18 lg:mb-4">{paragraph}</p>
        <div className="flex items-center justify-center">
          <Select
            options={tagList?.map((v) => ({ label: v, value: v }))}
            className="w-full lg:w-[300px]"
            placeholder="Filter Catogeries"
            mode="multiple"
            allowClear
            value={cateGory}
            onChange={(values) => {
              setCateGory(values);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:gap-6 lg:grid-cols-3">
        {templateList.map((tpl) => (
          <Card key={tpl.templateId} tpl={tpl} />
        ))}
      </div>
    </div>
  );
}
