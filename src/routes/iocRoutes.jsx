import React, { lazy } from 'react';
import { Route, useParams } from 'react-router-dom';
import Placeholder from '../components/layout/Placeholder.jsx';
import { ALL_SUBJECTS } from '../config/iocSubjects.js';

const LessonViewer = lazy(() => import('../components/viewers/LessonViewer/LessonViewer.jsx'));
const SubjectLanding = lazy(() => import('../components/dashboards/subject/SubjectLanding.jsx'));
const DespEac2Workbench = lazy(() => import('../components/dashboards/eac2/DespEac2Workbench.jsx'));
const LinkedInSeoAiBlog = lazy(() => import('../components/blog/LinkedInSeoAiBlog.jsx'));

export function DynamicLessonDispatcher() {
  const { subjectCode } = useParams();
  const norm = (subjectCode || '').toLowerCase().trim();

  const subj = ALL_SUBJECTS.find(s =>
    s.code === norm ||
    s.aliases.includes(norm) ||
    s.lessonPrefix === norm ||
    s.title.toLowerCase().includes(norm)
  ) || ALL_SUBJECTS[0];

  const baseCampus = subj.campus || 'ioc';

  return (
    <LessonViewer
      dataSource={subj.lecciones}
      gestionSource={subj.gestion}
      subjectCode={subj.code}
      title={subj.title}
      themeColor={subj.color}
      breadcrumbItems={[
        { label: 'Campus', to: '/' },
        { label: subj.title, to: `/${baseCampus}/${subj.code}` },
        { label: 'Libro Digital', isCurrent: true }
      ]}
    />
  );
}

export function getIocRoutes() {
  const routes = [
    ...[
      '/ioc/desp/eac2',
      '/desp/eac2',
      '/ioc/desp/eac2-workbench',
      '/desp/eac2-workbench',
      '/ioc/desp/eac2-teleprompter',
      '/desp/eac2-teleprompter',
      '/ioc/desp/teleprompter',
      '/ioc/asig-1/eac1',
      '/uoc/uoc-1/pec1',
      '/workbench-ejemplo'
    ].map(path => (
      <Route
        key={`workbench-${path}`}
        path={path}
        element={<DespEac2Workbench />}
      />
    )),
    <Route
      key="blog-linkedin-seo"
      path="/blog/seo-linkedin-filtros-ia"
      element={<LinkedInSeoAiBlog />}
    />
  ];

  ALL_SUBJECTS.forEach(subj => {
    const baseCampus = subj.campus || 'ioc';
    subj.aliases.forEach(alias => {
      routes.push(
        <Route
          key={`campus-landing-${baseCampus}-${alias}`}
          path={`/${baseCampus}/${alias}`}
          element={<SubjectLanding dataSource={subj.gestion} subjectConfig={subj} />}
        />,
        <Route
          key={`landing-${alias}`}
          path={`/${alias}`}
          element={<SubjectLanding dataSource={subj.gestion} subjectConfig={subj} />}
        />
      );
    });

    routes.push(
      <Route
        key={`lesson-base-${subj.code}`}
        path={`/${baseCampus}/${subj.code}/${subj.lessonPrefix}`}
        element={
          <LessonViewer
            dataSource={subj.lecciones}
            gestionSource={subj.gestion}
            subjectCode={subj.code}
            title={subj.title}
            themeColor={subj.color}
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: subj.title, to: `/${baseCampus}/${subj.code}` },
              { label: 'Libro Digital', isCurrent: true }
            ]}
          />
        }
      />,
      <Route
        key={`lesson-slug-${subj.code}`}
        path={`/${baseCampus}/${subj.code}/${subj.lessonPrefix}/:slug`}
        element={
          <LessonViewer
            dataSource={subj.lecciones}
            gestionSource={subj.gestion}
            subjectCode={subj.code}
            title={subj.title}
            themeColor={subj.color}
            breadcrumbItems={[
              { label: 'Campus', to: '/' },
              { label: subj.title, to: `/${baseCampus}/${subj.code}` },
              { label: 'Libro Digital', isCurrent: true }
            ]}
          />
        }
      />
    );
  });

  routes.push(
    <Route key="lec-sub" path="/lecciones/:subjectCode" element={<DynamicLessonDispatcher />} />,
    <Route key="lec-sub-slug" path="/lecciones/:subjectCode/:slug" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-sub-lec" path="/ioc/:subjectCode/lecciones" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-sub-lec-slug" path="/ioc/:subjectCode/lecciones/:slug" element={<DynamicLessonDispatcher />} />,
    <Route key="uoc-sub-lec" path="/uoc/:subjectCode/lecciones" element={<DynamicLessonDispatcher />} />,
    <Route key="uoc-sub-lec-slug" path="/uoc/:subjectCode/lecciones/:slug" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-desp-alias" path="/ioc/despliegue/:slug?" element={<DynamicLessonDispatcher />} />,
    <Route key="ioc-dash" path="/ioc" element={<Placeholder title="Dashboard IOC" />} />,
    <Route key="uoc-dash" path="/uoc" element={<Placeholder title="Dashboard UOC" />} />
  );

  return routes;
}
