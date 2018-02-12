function getValue(input, kode) {
  if (!input.startsWith(kode)) return null
  const value = input.replace(kode, '')
  if (value.length === 0) return 'ALL'
  return value.replace('-', '0').slice(-2)
}

// Slår opp stilen fra style.json for lag med spesifikt navn
function hentLag(map, kode) {
  if (!kode) return null
  let layer = map.getLayer(kode)
  if (layer) return layer

  const fylkeNr = getValue(kode, 'GEO_FY')
  if (fylkeNr) {
    const filter =
      fylkeNr === 'ALL' ? ['!=', 'FY', '-1'] : ['in', 'FY', '', fylkeNr]
    return {
      id: kode,
      type: 'fill',
      source: 'composite',
      'source-layer': 'FY',
      filter: filter,
      layout: {},
      paint: {
        'fill-outline-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 0%, 70%)'],
            [7, 'hsla(0, 0%, 0%, 70%)'],
            [10, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
        'fill-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 100%, 20%)'],
            [7, 'hsla(0, 0%, 100%, 20%)'],
            [10, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
      },
    }
  }

  let kommuneMatch = kode.match(/GEO_KO-(.*)/)
  if (kommuneMatch && kommuneMatch.length === 2) {
    let kommuneNr = ('0' + kommuneMatch[1]).slice(-4)
    return {
      id: kode,
      type: 'fill',
      source: 'composite',
      'source-layer': 'KO',
      filter: ['in', 'KO', '', kommuneNr],
      layout: {},
      paint: {
        'fill-outline-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 0%, 60%)'],
            [9, 'hsla(0, 0%, 0%, 20%)'],
            [11, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
        'fill-color': {
          base: 1,
          stops: [
            [0, 'hsla(0, 0%, 100%, 60%)'],
            [9, 'hsla(0, 0%, 100%, 20%)'],
            [12, 'hsla(0, 0%, 0%, 0%)'],
          ],
        },
      },
    }
  }

  let filter = {
    id: kode,
    type: 'fill',
    source: 'composite',
    'source-layer': 'naturomrader6',
    interactive: true,
    filter: ['has', kode],
    layout: {},
    paint: {
      'fill-color': 'hsla(251, 59%, 28%, 0.8)',
      'fill-outline-color': 'hsla(251, 59%, 69%, 0.8)',
    },
  }
  return filter
}

export default hentLag