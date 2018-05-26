import React from 'react'
import { storiesOf } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { action } from '@storybook/addon-actions/dist/index'
import { MemoryRouter } from 'react-router-dom'
import AktiveKartlag from '.'

const koder = [{ tittel: { nb: 'aabc' } }]

storiesOf('Aktive kartlag', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <div style={{ width: 400 }}>
      <MemoryRouter>
        <AktiveKartlag
          koder={koder}
          onUpdateLayerProp={action('updateLayerProp')}
          onMouseEnter={action('mouseEnter')}
          onMouseLeave={action('mouseLeave')}
          onClick={action('click')}
        />
      </MemoryRouter>
    </div>
  ))
