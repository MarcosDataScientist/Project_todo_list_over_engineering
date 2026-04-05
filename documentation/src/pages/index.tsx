import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/geral/processo-desenvolvimento">
            Ver Processo de Desenvolvimento 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Documentação - ${siteConfig.title}`}
      description="Documentação do projeto Todo List Over Engineering">
      <HomepageHeader />
      <main>
        <div className="container" style={{padding: '3rem 0', textAlign: 'center'}}>
          <Heading as="h2">Foco em Excelência Técnica</Heading>
          <p style={{fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto'}}>
            Este é um projeto acadêmico de <strong>Engenharia de Software</strong> focado em implementar e documentar as melhores 
            <strong>boas práticas de programação</strong>, padrões de arquitetura e infraestrutura moderna.
          </p>
        </div>
      </main>
    </Layout>
  );
}
