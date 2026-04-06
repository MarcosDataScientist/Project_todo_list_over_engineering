import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Ver Documentação 🚀
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/api/todo-list-api">
              Referência da API 🔌
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Bem-vindo ao ${siteConfig.title}`}
      description="Documentação técnica do projeto Todo List Over Engineering">
      <HomepageHeader />
      <main>
        <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
          <h2>Excelência em Engenharia de Software</h2>
          <p>Explore nossa documentação para entender a arquitetura, padrões de projeto e integrações.</p>
        </div>
      </main>
    </Layout>
  );
}
