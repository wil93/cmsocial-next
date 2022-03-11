import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'

import "bootstrap3/dist/css/bootstrap.css";
import "bootstrap3/dist/css/bootstrap-theme.css";
import "font-awesome/css/font-awesome.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CMSocial - a social coding app</title>
      </Head>

      <Script src="/scripts/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-animate.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-cookies.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-md5.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-resource.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-route.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-sanitize.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-touch.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/angular-ui-router.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/ace.js" strategy="beforeInteractive" />
      <Script src="/scripts/ui-ace.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/react.min.js" strategy="beforeInteractive" />
      <Script src="/scripts/react-dom.min.js" strategy="beforeInteractive" />

      <Script src="/scripts/app.js" strategy="beforeInteractive" />
      <Script src="/scripts/admin.js" strategy="beforeInteractive" />
      <Script src="/scripts/contest.js" strategy="beforeInteractive" />
      <Script src="/scripts/footer.js" strategy="beforeInteractive" />
      <Script src="/scripts/l10n.js" strategy="beforeInteractive" />
      <Script src="/scripts/lessons.js" strategy="beforeInteractive" />
      <Script src="/scripts/material.js" strategy="beforeInteractive" />
      <Script src="/scripts/navbar.js" strategy="beforeInteractive" />
      <Script src="/scripts/notifications.js" strategy="beforeInteractive" />
      <Script src="/scripts/pagination.js" strategy="beforeInteractive" />
      <Script src="/scripts/ranking.js" strategy="beforeInteractive" />
      <Script src="/scripts/signup.js" strategy="beforeInteractive" />
      <Script src="/scripts/task.js" strategy="beforeInteractive" />
      <Script src="/scripts/tasks.js" strategy="beforeInteractive" />
      <Script src="/scripts/tests.js" strategy="beforeInteractive" />
      <Script src="/scripts/user.js" strategy="beforeInteractive" />

      <div ng-app="cmsocial" className="ng-scope">
        {/* @ts-ignore */}
        <navbar></navbar>

        <div className="notifications"></div>
        <div ui-view="" className="ng-scope"></div>

        {/* @ts-ignore */}
        <foot></foot>
      </div>
    </>
  )
}

export default Home
