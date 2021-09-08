import * as React from "react"
import styled from "styled-components"

import { WeightUnit } from "enums"
import { PackItem } from "types/item"
import { weightUnitOptions } from "utils/form"

import { Select } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"

const WeightContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
`

interface Props {
  unit: WeightUnit
  items: PackItem[]
  selectUnit: (unit: WeightUnit) => void
}

const WeightSelector: React.FC<Props> = ({ unit, items, selectUnit }) => {
  return (
    <div>
      <WeightContainer>
        <Select
          defaultValue={{ value: unit, label: unit }}
          options={weightUnitOptions()}
          label="Weight unit"
          onChange={(option: Option<string>) => {
            // const unit = Object.keys(WeightUnit).find(
            //   (key) => WeightUnit[key] === option.value
            // );
            // @ts-ignore
            selectUnit(WeightUnit[option])
          }}
          last={true}
        />
      </WeightContainer>
    </div>
  )
}

export default WeightSelector
