import React from 'react'
import { observer } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';
import { useScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { useBEM } from '../../lib/hooks';
import { useStore } from '../../stores';
import { Button } from '@material-ui/core';

function Export() {
  const { eventStore, strategiesStore } = useStore();
  const bem = useBEM( 'more' );
  const { dataType } = useParams();

  useScrollToTop();

  return (
    <section className={bem()}>
      <header className={bem( 'header' )}>
        <h1 className={bem( 'app-title' )}>myMoney Calendar</h1>
        <h2 className={bem( 'section-title' )}>Save {dataType}</h2>
      </header>
      <Link to="/more">
        <Button className="back-button" variant="contained">
          Back
        </Button>
      </Link>
    </section>
  );
}

export default observer( Export );
