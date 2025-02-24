/**
 * Copyright 2021 Agnostiq Inc.
 *
 * This file is part of Covalent.
 *
 * Licensed under the GNU Affero General Public License 3.0 (the "License").
 * A copy of the License may be obtained with this software package or at
 *
 *      https://www.gnu.org/licenses/agpl-3.0.en.html
 *
 * Use of this file is prohibited except in compliance with the License. Any
 * modifications or derivative works of this file must retain this copyright
 * notice, and modified files must contain a notice indicating that they have
 * been altered from the originals.
 *
 * Covalent is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * Relief from the License may be granted by purchasing a commercial license.
 */

import { useZoomPanHelper } from 'react-flow-renderer'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import {
  Add as PlusIcon,
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  ArrowUpward,
  Fullscreen,
  LockOpenOutlined,
  LockOutlined,
  MapOutlined,
  Remove as MinusIcon
} from '@mui/icons-material'
import useFitViewHelper from './ReactFlowHooks'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LabelOffIcon from '@mui/icons-material/LabelOff';
import LabelIcon from '@mui/icons-material/Label';
import * as React from 'react';
import { LayoutOptions } from './LayoutOptions';
import { ReactComponent as ScreenshotIcon } from '../../assets/screenshot.svg'

const LatticeControls = ({
  marginLeft = 0,
  marginRight = 0,
  showParams,
  toggleParams,
  showMinimap,
  toggleMinimap,
  direction,
  setDirection,
  algorithm,
  handleChangeAlgorithm,
  nodesDraggable,
  toggleNodesDraggable,
  open,
  handleClick,
  anchorEl,
  handleClose,
  handleHideLabels,
  hideLabels,
  toggleScreenShot
}) => {
  const { zoomIn, zoomOut } = useZoomPanHelper()
  const { fitView } = useFitViewHelper()
  return (
    <ToggleButtonGroup
      orientation="vertical"
      size="small"
      sx={{
        position: 'absolute',
        bottom: 12,
        left: 12 + marginLeft,
        zIndex: 5,
        bgcolor: 'background.paper',
        opacity: 0.7,
      }}
    >
      <Hint title="Zoom in">
        <ToggleButton value="" onClick={() => zoomIn(300)}>
          <PlusIcon />
        </ToggleButton>
      </Hint>

      <Hint title="Zoom out">
        <ToggleButton value="" onClick={() => zoomOut(300)}>
          <MinusIcon />
        </ToggleButton>
      </Hint>
      <Hint title="Download Screenshot">
        <ToggleButton
          onClick={toggleScreenShot}
          value=""
          sx={{ height: '40px', color: 'white' }}>
          <ScreenshotIcon />
        </ToggleButton>
      </Hint>

      <Hint title="Fit to screen">
        <ToggleButton
          value=""
          onClick={() => {
            fitView({ duration: 300, marginLeft, marginRight })
          }}
        >
          <Fullscreen />
        </ToggleButton>
      </Hint>
      <Hint title="Toggle minimap">
        <ToggleButton onClick={toggleMinimap} value="" selected={showMinimap}>
          <MapOutlined />
        </ToggleButton>
      </Hint>
      <Hint title="Change layout">
        <ToggleButton data-testid="tooglebuttonclick" onClick={(e) => handleClick(e)} value="">
          <DashboardIcon />
        </ToggleButton>
      </Hint>

      <LayoutOptions
        algorithm={algorithm}
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        handleChangeAlgorithm={handleChangeAlgorithm}
      />

      <Hint title="Change orientation">
        <ToggleButton
          data-testid="changeorientation"
          onClick={() => {
            switch (direction) {
              case 'UP':
                return setDirection('RIGHT')
              case 'DOWN':
                return setDirection('LEFT')
              case 'LEFT':
                return setDirection('UP')
              case 'RIGHT':
                return setDirection('DOWN')
              default:
            }
          }}
          value=""
        >
          {
            {
              DOWN: <ArrowDownward />,
              UP: <ArrowUpward />,
              RIGHT: <ArrowForward />,
              LEFT: <ArrowBack />,
            }[direction]
          }
        </ToggleButton>
      </Hint>

      <Hint data-testid="handlelabelhide" title={hideLabels ? 'Show labels' : 'Hide labels'}>
        <ToggleButton value="" onClick={() => handleHideLabels()}>
          {hideLabels ? <LabelOffIcon /> : <LabelIcon />}
        </ToggleButton>
      </Hint>
      <Hint title="Toggle parameters">
        <ToggleButton data-testid="toggleparams" onClick={toggleParams} value="" selected={showParams}>
          P
        </ToggleButton>
      </Hint>
      <Hint title="Toggle draggable nodes">
        <ToggleButton data-testid="toggledragablenode" onClick={toggleNodesDraggable} value="">
          {nodesDraggable ? <LockOpenOutlined /> : <LockOutlined />}
        </ToggleButton>
      </Hint>
    </ToggleButtonGroup>
  )
}

const Hint = (props) => <Tooltip arrow placement="right" {...props} />

export default LatticeControls
