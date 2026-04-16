import { Component, Input, OnInit } from '@angular/core';

export interface TechConfig {
  displayName: string;
  iconSlug: string | null;
  iconColor: string;
  releaseUrl: string;
}

interface ResolvedBadge extends TechConfig {
  key: string;
  initials: string;
}

export const TECH_REGISTRY: Record<string, TechConfig> = {
  angular:     { displayName: 'Angular',         iconSlug: 'angular',            iconColor: 'DD0031', releaseUrl: 'https://github.com/angular/angular/releases' },
  angularjs:   { displayName: 'AngularJS',       iconSlug: 'angularjs',          iconColor: 'E23237', releaseUrl: 'https://github.com/angular/angular.js/releases' },
  spring:      { displayName: 'Spring',          iconSlug: 'spring',             iconColor: '6DB33F', releaseUrl: 'https://github.com/spring-projects/spring-framework/releases' },
  springcloud: { displayName: 'Spring Cloud',    iconSlug: 'spring',             iconColor: '6DB33F', releaseUrl: 'https://spring.io/projects/spring-cloud' },
  openshift:   { displayName: 'OpenShift',       iconSlug: 'redhatopenshift',    iconColor: 'EE0000', releaseUrl: 'https://developers.redhat.com/products/openshift/download' },
  html5:       { displayName: 'HTML5',           iconSlug: 'html5',              iconColor: 'E34F26', releaseUrl: 'https://html.spec.whatwg.org/' },
  webgl:       { displayName: 'WebGL',           iconSlug: 'webgl',              iconColor: '0070FF', releaseUrl: 'https://registry.khronos.org/webgl/' },
  phaser:      { displayName: 'Phaser 3',        iconSlug: null,                 iconColor: '000000', releaseUrl: 'https://github.com/phaserjs/phaser/releases' },
  nodejs:      { displayName: 'Node.js',         iconSlug: 'nodedotjs',          iconColor: '339933', releaseUrl: 'https://nodejs.org/en/download' },
  rxjs:        { displayName: 'RxJS',            iconSlug: 'reactivex',          iconColor: 'BD3C28', releaseUrl: 'https://github.com/ReactiveX/rxjs/releases' },
  apachecamel: { displayName: 'Apache Camel',    iconSlug: null,                 iconColor: 'D13212', releaseUrl: 'https://camel.apache.org/releases/' },
  ibmzos:      { displayName: 'IBM z/OS',        iconSlug: 'ibm',                iconColor: '0F62FE', releaseUrl: 'https://www.ibm.com/products/zos' },
  java:        { displayName: 'Java',            iconSlug: 'openjdk',            iconColor: 'F89820', releaseUrl: 'https://openjdk.org/projects/jdk/' },
  db2:         { displayName: 'IBM Db2',         iconSlug: 'ibm',                iconColor: '0F62FE', releaseUrl: 'https://www.ibm.com/docs/en/db2' },
  websphere:   { displayName: 'WebSphere',       iconSlug: 'ibm',                iconColor: '0F62FE', releaseUrl: 'https://www.ibm.com/support/pages/websphere-application-server-releases' },
  parature:    { displayName: 'Parature',        iconSlug: null,                 iconColor: '0078D4', releaseUrl: 'https://learn.microsoft.com/en-us/lifecycle/announcements/parature-end-of-support' },
  jabber:      { displayName: 'Cisco Jabber',    iconSlug: 'jabber',             iconColor: '004B87', releaseUrl: 'https://www.cisco.com/c/en/us/support/unified-communications/jabber-windows/products-release-notes-list.html' },
  coldfusion:  { displayName: 'ColdFusion',      iconSlug: 'adobe',              iconColor: 'FF0000', releaseUrl: 'https://helpx.adobe.com/coldfusion/release-notes.html' },
  dotnet:      { displayName: '.NET',            iconSlug: 'dotnet',             iconColor: '512BD4', releaseUrl: 'https://github.com/dotnet/core/releases' },
  kofax:       { displayName: 'Kofax',           iconSlug: 'kofax',              iconColor: '003DA5', releaseUrl: 'https://community.kofax.com/s/question/0D53m00006FG8NUCA1/capture-release-announcements' },
  oracle:      { displayName: 'Oracle',          iconSlug: 'oracle',             iconColor: 'F80000', releaseUrl: 'https://www.oracle.com/database/technologies/oracle-database-software-downloads.html' },
  solaris:     { displayName: 'Oracle Solaris',  iconSlug: 'oracle',             iconColor: 'F80000', releaseUrl: 'https://www.oracle.com/solaris/solaris11/downloads/' },
  jboss:       { displayName: 'JBoss EAP',       iconSlug: 'redhat',             iconColor: 'EE0000', releaseUrl: 'https://access.redhat.com/products/red-hat-jboss-enterprise-application-platform' },
  redhat:      { displayName: 'Red Hat',         iconSlug: 'redhat',             iconColor: 'EE0000', releaseUrl: 'https://access.redhat.com/downloads' },
  iis:         { displayName: 'IIS',             iconSlug: 'microsoft',          iconColor: '5E5E5E', releaseUrl: 'https://learn.microsoft.com/en-us/iis/get-started/whats-new-in-iis-10/' },
  sqlserver:   { displayName: 'SQL Server',      iconSlug: 'microsoftsqlserver', iconColor: 'CC2927', releaseUrl: 'https://learn.microsoft.com/en-us/sql/sql-server/sql-server-2022-release-notes' },
  javascript:  { displayName: 'JavaScript',      iconSlug: 'javascript',         iconColor: 'F7DF1E', releaseUrl: 'https://tc39.es/ecma262/' },
  azure:       { displayName: 'Microsoft Azure', iconSlug: 'microsoftazure',     iconColor: '0078D4', releaseUrl: 'https://azure.microsoft.com/en-us/updates/' },
  githubpages: { displayName: 'GitHub Pages',    iconSlug: 'github',             iconColor: '181717', releaseUrl: 'https://github.blog/changelog/' },
  pegasystems: { displayName: 'Pega Systems',    iconSlug: 'pegasystems',        iconColor: '003D6B', releaseUrl: 'https://docs.pega.com/bundle/platform/page/platform/get-started/release-notes.html' },
  cobol:       { displayName: 'COBOL',           iconSlug: null,                 iconColor: '003D6B', releaseUrl: 'https://www.ibm.com/docs/en/cobol-zos' },
  jcl:         { displayName: 'JCL',             iconSlug: null,                 iconColor: '052FAD', releaseUrl: 'https://www.ibm.com/docs/en/zos/2.5.0?topic=programming-jcl-concepts' },
};

function toInitials(name: string): string {
  return name
    .split(/[\s/.\-]+/)
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .slice(0, 3)
    .join('');
}

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  templateUrl: './tech-badge.component.html',
  styleUrl: './tech-badge.component.scss',
})
export class TechBadgeComponent implements OnInit {
  @Input() techs: string[] = [];

  badges: ResolvedBadge[] = [];

  ngOnInit(): void {
    this.badges = this.techs
      .map(key => {
        const config = TECH_REGISTRY[key];
        if (!config) return null;
        return { key, ...config, initials: toInitials(config.displayName) };
      })
      .filter((b): b is ResolvedBadge => b !== null);
  }
}
