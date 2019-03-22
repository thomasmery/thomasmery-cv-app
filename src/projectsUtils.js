export function getTechnologiesFromProjects( projects ) {
  const _technologies = projects
      .map( (project) => project.technologies ? project.technologies.map( ( name ) => ( { name } ) ) : [] )
      .reduce( ( accumulator, value ) => [ ...accumulator, ...value ], []);

  const _technologies_aggregated = [];
  _technologies.forEach( ( techno ) => {
      const _exists = _technologies_aggregated.filter( (_techno) => techno.name === _techno.name );
      if( _exists.length ) {
        _exists[0].count = parseInt(_exists[0].count, 10) + 1;
      }
      else {
        techno['count'] = 1;
        _technologies_aggregated.push(techno);
      }
    }
  );

  return _technologies_aggregated.sort( (a,b) => b.count - a.count );
}