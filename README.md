# Read Full Profile Demo

> Steps to develop a simple script for retrieving a full Profile.
>
> Salesforce Developer Group, Munich
>
> 2022-01-20

## Background

In general retrieving a Profile with the following command returns an almost empty file with only `<userPermissions>` elements.

```console
sfdx force:source:retrieve -m Profile:Admin
```

force-app/main/default/profiles/Admin.profile-meta.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Profile xmlns="http://soap.sforce.com/2006/04/metadata">
    <custom>false</custom>
    <userLicense>Salesforce</userLicense>
    <userPermissions>
        <enabled>true</enabled>
        <name>AIViewInsightObjects</name>
    </userPermissions>
    ...
</Profile>
```

> Exception: In scratch orgs, this command returns a full Profile (see this [Minimal Working Example](https://github.com/mdapi-issues/retrieve-behavior-scratch-org))

Questions: How to get a full Profile including field and object permissions from any org?

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Profile xmlns="http://soap.sforce.com/2006/04/metadata">
    <applicationVisibilities>
        <application>DreamHouse</application>
        <default>false</default>
        <visible>true</visible>
    </applicationVisibilities>
    <userLicense>Salesforce</userLicense>
    <userPermissions>
        <enabled>true</enabled>
        <name>AIViewInsightObjects</name>
    </userPermissions>
    ...
    <classAccesses>
        <apexClass>AccountListControllerLwc</apexClass>
        <enabled>true</enabled>
    </classAccesses>
    ...
    <custom>false</custom>
    <fieldPermissions>
        <editable>true</editable>
        <field>Account.AccountNumber</field>
        <readable>true</readable>
    </fieldPermissions>
    ...
    <objectPermissions>
        <allowCreate>true</allowCreate>
        <allowDelete>true</allowDelete>
        <allowEdit>true</allowEdit>
        <allowRead>true</allowRead>
        <modifyAllRecords>true</modifyAllRecords>
        <object>Account</object>
        <viewAllRecords>true</viewAllRecords>
    </objectPermissions>
    ...
</Profile>
```

## Metadata API Knowledge

Metadata API (`retrieve()` vs. `readMetadata()`)

[🔗](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_objects_intro.htm)

- **File-based** calls, such as `deploy()` and `retrieve()` with _package.xml_
- **Utility** calls, such as `listMetadata()` and `describeMetadata()`, `renameMetadata()`
- **CRUD** calls, such as `createMetadata()`, `readMetadata()`, `updateMetadata()` and `deleteMetadata()`

## Steps

1. "Hello World!" with Node.js

   ```console
   node step1.js
   ```

1. Turn the script into an executable

   ```console
   chmod +x script2.js
   ./step2.js
   ```

1. Import `@salesforce/core` as an [ES Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and print the username of the org

   ```console
   ./step3.mjs
   SFDX_DEFAULTUSERNAME=other-org ./step3.mjs
   ```

1. Read the Profile using `readMetadata()` as JSON and print it

   ```console
   ./step4.mjs | less
   ```

1. Convert the Profile to XML using `xml2js` and print it

   ```console
   ./step4.mjs > force-app/main/default/profiles/Admin.profile-meta.xml
   ```

## Implementation Notes

- [@salesforce/core](https://forcedotcom.github.io/sfdx-core) getting access to sfdx authenticated orgs
- [jsforce](https://jsforce.github.io/start) (the library behind the `Connection` instance to access most Salesforce APIs)
- [sfdx Environment Variables](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_env_variables.htm) "SFDX_DEFAULTUSERNAME"

## Where to go from here?

- [awesome-sfdx-plugins](https://github.com/mshanemc/awesome-sfdx-plugins) a collection of useful sfdx plugins
- [Salesforce CLI Plug-In Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
- [oclif - The Open CLI Framework](https://oclif.io) used in sfdx
- [@salesforce/source-deploy-retrieve](https://forcedotcom.github.io/source-deploy-retrieve) (library to deal with project files and deployments)
