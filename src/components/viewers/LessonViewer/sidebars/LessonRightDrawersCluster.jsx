import React, { lazy, Suspense } from 'react';

const SubjectRightAside = lazy(() => import('../../../dashboards/SubjectRightAside.jsx'));

export default function LessonRightDrawersCluster({
  subjectConfig,
  themeColor,
  onSelectTopic
}) {
  const {
    resolvedSubjectConfig,
    iocGestionData,
    isIocSubject
  } = subjectConfig;

  return (
    <Suspense fallback={null}>
      {isIocSubject && resolvedSubjectConfig && (
        <SubjectRightAside
          subjectConfig={resolvedSubjectConfig}
          gestionData={iocGestionData}
          themeColor={themeColor || resolvedSubjectConfig.color}
          topOffset="126px"
          onSelectLesson={onSelectTopic}
        />
      )}
    </Suspense>
  );
}
