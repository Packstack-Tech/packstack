import * as React from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Pack } from "types/pack";

import { getGenderName } from "enums";
import { getPackPath } from "routes";
import Stat from "./Stat";

import { CalendarIcon, TempIcon, FootprintsIcon } from "app/components/Icons";

import { StatCollection } from "./styles";

interface StatProps {
  pack: Pack;
}

const Statistics: React.FC<StatProps> = ({ pack }) => {
  const { season, duration, duration_unit, gender, temp_range, id, title } =
    pack;
  const durationValue = () => {
    if (!duration) {
      return null;
    }
    return `${duration} ${duration_unit}`;
  };

  let packUrlLabel = "Pack URL " + (pack.public ? "" : "(private)");
  const packUrl = getPackPath(id, title);

  return (
    <StatCollection>
      <Stat label="Season" value={season} icon={<CalendarIcon />} />
      <Stat label="Temp Range" value={temp_range} icon={<TempIcon />} />
      <Stat
        label="Duration"
        value={durationValue()}
        icon={<FootprintsIcon />}
      />
      <Stat label="Gender" value={getGenderName(gender)} />
      <Stat label={packUrlLabel} value={packUrl} icon={<LinkOutlined />}></Stat>
    </StatCollection>
  );
};

export default Statistics;
