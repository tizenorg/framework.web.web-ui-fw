Name:		web-ui-fw
Summary:	Tizen Web UI Framework Library
Version:	0.1.11
Release:	1
Group:		TO_BE/FILLED_IN
License:	MIT
Source0:        %{name}-%{version}.tar.bz2
BuildRequires:	node-js, make

%description
Tizen Web UI Framework library package

%prep
%setup -q

%build
make


%install
%make_install

%post


%files
/usr/lib/tizen-web-ui-fw/*/js
/usr/lib/tizen-web-ui-fw/*/themes/tizen-gray


