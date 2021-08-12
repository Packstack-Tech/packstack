import * as React from "react";
import { Tooltip, Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

import { PackItem } from "types/item";

import { Input, Textarea } from "../FormFields";
import { WornIndicator, ItemRow } from "./styles";

import { DragIcon, ShirtIcon } from "../Icons";
import { PackItemGrid } from "styles/grid";
import { PackConstants } from "types/pack";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
  item: PackItem;
  updateId: number | null;
  removeItem: (id: number) => void;
  updateItem: (
    id: number,
    field: string,
    value: string | number | boolean
  ) => void;
  index: number;
}

const Item: React.FC<ItemProps> = ({ item, removeItem, updateItem, index }) => {
  const { notes, quantity, worn } = item.packItem;
  const [displayNotes, setDisplayNotes] = React.useState<boolean>(false);

  const notesLabel = () => {
    const label =
      !displayNotes && !notes ? "add" : displayNotes ? "hide" : "show";
    return `${label} notes`;
  };
  return (
    <Draggable
      draggableId={item.id.toString()}
      index={index}
      key={item.id.toString()}
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <ItemRow>
            <PackItemGrid>
              <div className="drag-icon" {...provided.dragHandleProps}>
                <DragIcon />
              </div>
              <div>
                <strong>{item.name}</strong>
                <a
                  onClick={() => setDisplayNotes(!displayNotes)}
                  className="add-notes"
                >
                  {notesLabel()}
                </a>
              </div>
              <div>{item.product_name}</div>
              <div className="align-right">
                {item.weight} {item.weight_unit}
              </div>
              <div className="align-right">
                <WornIndicator className={worn ? "active" : ""}>
                  <Tooltip
                    title="Worn items are excluded from base weight"
                    mouseEnterDelay={0.25}
                    style={{ padding: "8px", textAlign: "center" }}
                  >
                    <Button
                      type="ghost"
                      className="ant-btn-icon-only"
                      onClick={() => updateItem(item.id, "worn", !worn)}
                    >
                      <ShirtIcon />
                    </Button>
                  </Tooltip>
                </WornIndicator>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <Input
                  value={quantity}
                  style={{ marginBottom: 0, marginRight: "4px" }}
                  type="number"
                  onChange={(v) => updateItem(item.id, "quantity", v)}
                />
                <span style={{ color: "#aaa", fontSize: "12px" }}>qty</span>
              </div>
              <div className="align-center">
                <CloseCircleFilled
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            </PackItemGrid>
            {displayNotes && (
              <Textarea
                value={notes}
                onChange={(v) => updateItem(item.id, "notes", v)}
                allowedLength={PackConstants.notes}
              />
            )}
          </ItemRow>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Item);
