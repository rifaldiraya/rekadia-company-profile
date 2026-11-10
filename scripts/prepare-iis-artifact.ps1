param(
  [Parameter(Mandatory = $true)]
  [string]$Destination
)

$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path

if (Test-Path $Destination) {
  Remove-Item $Destination -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $Destination | Out-Null

$folders = @('.next', 'node_modules', 'public')
$files = @(
  'package.json',
  'server.js',
  'web.config',
  'next.config.js',
  'next.config.mjs',
  'next.config.ts',
  '.env.local'
)

foreach ($folder in $folders) {
  $source = Join-Path $root $folder
  if (-not (Test-Path $source)) {
    continue
  }

  $target = Join-Path $Destination $folder
  New-Item -ItemType Directory -Force -Path $target | Out-Null
  robocopy $source $target /E /NFL /NDL /NJH /NJS /NC /NS /NP
  if ($LASTEXITCODE -ge 8) {
    throw "Failed to copy $folder (robocopy exit $LASTEXITCODE)"
  }
}

foreach ($file in $files) {
  $source = Join-Path $root $file
  if (Test-Path $source) {
    Copy-Item $source -Destination (Join-Path $Destination $file) -Force
  }
}

# Robocopy uses 0-7 as success; reset so the pipeline step does not fail.
$global:LASTEXITCODE = 0
exit 0
