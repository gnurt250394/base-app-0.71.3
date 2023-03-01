fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles

### ios build

```sh
[bundle exec] fastlane ios build
```

Fetch certificates. Build the iOS application.

### ios uploadToDeploygate

```sh
[bundle exec] fastlane ios uploadToDeploygate
```

Fetch certificates, build and upload to Deploygate.

### ios uploadToAppcenter

```sh
[bundle exec] fastlane ios uploadToAppcenter
```

Fetch certificates, build and upload to App Center.

### ios uploadIPA

```sh
[bundle exec] fastlane ios uploadIPA
```

Push a new build to Fabric and FireBase App Distribution

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
