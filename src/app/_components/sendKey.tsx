"use client";

import { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Toggle } from "./ui/toggle";
import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export function SendKey() {
  const [ip, setIp] = useState("");
  const [gridItems, setGridItems] = useState([
    { name: "Pen" },
    { name: "Eraser" },
  ]);
  const [layouts, setLayouts] = useState<any>();
  const [editMode, setEditMode] = useState(false);

  async function postLocal() {
    console.log(ip);
    await fetch(`https://${ip}:3001/press/E`, {
      headers: {
        "Access-Control-Request-Private-Network": "true",
      },
    });
  }
  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex grow-0 flex-row gap-4 p-2 items-center">
          <Label htmlFor="ipAddress" className="text-white whitespace-nowrap">
            Local Server Ip
          </Label>
          <Input
            className="text-white"
            type="text"
            id="ipAddress"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Switch id="editMode" onClick={() => setEditMode(!editMode)} />
            <Label htmlFor="editMode" className="text-white whitespace-nowrap">
              Edit Mode
            </Label>
          </div>
        </div>
        <div className="grow select-none">
          <ResponsiveReactGridLayout
            cols={{ lg: 4, md: 2, sm: 2, xs: 2, xxs: 2 }}
            preventCollision={true}
            isResizable={editMode}
            isDraggable={editMode}
            layouts={layouts}
            onLayoutChange={setLayouts}
          >
            {gridItems.map((item, i) => (
              <div
                className={cn(
                  "flex h-full w-full flex-row items-center justify-center rounded border-slate-700 border text-blue-500 font-bold transition-colors",
                  {
                    "cursor-move hover:border-slate-600": editMode,
                    "cursor-pointer": !editMode,
                  },
                )}
                key={item.name}
              >
                {item.name}
              </div>
            ))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </>
  );
}
