import React from 'react'
import { observer } from 'mobx-react';
import { useStore } from '../../stores';
import { useScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { Card, CardGroup } from '../../components/card/card';
import { Button } from '@material-ui/core';

const StrategyCards = ( { results } ) => <main className='strategy-cards'>
  <CardGroup columns={2}>
    {results.map( ( result, index ) => <Card title={result.title} icon={result.icon1} key={`strategy-${ index }`}>
      <p>{result.body}</p>

      {Boolean( result.link ) &&
            <div className='m-card_footer'>
              <Button variant="contained" color="secondary" href={result.link.href} className='a-btn a-btn__full-on-xs' target='_blank'>
                {result.link.text}
              </Button>
            </div>
      }
    </Card>
    )}
  </CardGroup>
</main>;
function Strategies() {
  const { strategiesStore } = useStore();

  useScrollToTop();

  return (
    <section className='strategies'>
      {strategiesStore.strategyResults.length > 0 && <StrategyCards results={strategiesStore.strategyResults} />}
    </section>
  );
}

export default observer( Strategies );
